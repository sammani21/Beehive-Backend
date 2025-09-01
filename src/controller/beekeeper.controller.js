const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const StandardResponse = require("../dto/StandardResponse");
const { Beekeeper } = require("../types/SchemaTypes");
const BeekeeperModel = require("../model/beekeeper.model");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const validator = require('validator');
const sendEmail = require("../utils/sendEmail");

function generatePassword(length) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + specialChars;
    
    let password = '';
    
    // Ensure the password includes at least one character from each category
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    // Fill the remaining length with random characters from all categories
    for (let i = 4; i < length; i++) {
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
      password += randomChar;
    }
    
    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    
    return password;
}

function generateUsername(name) {
    return name.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);
}

/**
 * Create a beekeeper
 */
exports.createBeekeeper = tryCatch(async (req, res) => {
    const beekeeper = req.body;

    console.log(beekeeper);

    const username = generateUsername(beekeeper.lastName);
    const password = generatePassword(12);

    const hashedPassword = await bcrypt.hash(password, 10);

    beekeeper.username = username;
    beekeeper.password = hashedPassword;

    const beekeeperModel = new BeekeeperModel(beekeeper);
    const savedBeekeeper = await beekeeperModel.save();

    await sendEmail(beekeeper.email, 'Your Account Details',
         ` Welcome to BeeHive Manager!

         Your account has been created successfully.\nUsername: ${username}\nPassword: ${password}
         
         Please change your password after logging in.
         
         Best regards,
         BeeHive Manager Team`);

    const response = { statusCode: 201, msg: "created successfully", data: savedBeekeeper._id };
    res.status(201).send(response);
});

/**
 * get all beekeepers
 */
exports.getAllBeekeepers = tryCatch(async (req, res) => {
    const beekeepers = await BeekeeperModel.find();
    const response = { statusCode: 200, msg: "OK", data: beekeepers };
    res.status(200).send(response);
});

/**
 * get a beekeeper
 */
exports.getBeekeeper = tryCatch(async (req, res) => {
    const beekeeper = await BeekeeperModel.findOne({ _id: req.params.id });

    if (!beekeeper) {
        const errorResponse = { statusCode: 404, msg: `${req.params.id} beekeeper not found!` };
        return res.status(404).send(errorResponse);
    }
    const response = { statusCode: 200, msg: "OK", data: beekeeper };
    res.status(200).send(response);
});

/**
 * update a beekeeper
 */
exports.updateBeekeeper = tryCatch(async (req, res) => {
    const beekeeperId = req.params.id;
    console.log(req.body);
    const updateFields = {};
    const originalFields = {};

    if (req.body.email) {
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        updateFields.email = req.body.email;
    }
    if (req.body.firstName) updateFields.firstName = req.body.firstName;
    if (req.body.lastName) updateFields.lastName = req.body.lastName;
    if (req.body.nic) updateFields.nic = req.body.nic;
    if (req.body.gender) {
        if (!['Male', 'Female', 'Other'].includes(req.body.gender)) {
            return res.status(400).json({ error: 'Invalid gender' });
        }
        updateFields.gender = req.body.gender;
    }
    if (req.body.dob) updateFields.dob = new Date(req.body.dob);
    if (req.body.contactNo) {
        if (!/^\d{10}$/.test(req.body.contactNo)) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }
        updateFields.contactNo = req.body.contactNo;
    }
    if (req.body.licenseNo) updateFields.licenseNo = req.body.licenseNo;
    if (req.body.licenseExpireDate) updateFields.licenseExpireDate = new Date(req.body.licenseExpireDate);
    if (req.body.medicalIssues) updateFields.medicalIssues = req.body.medicalIssues;
    if (req.body.availability !== undefined) updateFields.availability = req.body.availability;
    if (req.body.isActive !== undefined) updateFields.isActive = req.body.isActive;
    
    try {
        const beekeeper = await BeekeeperModel.findOneAndUpdate(
            { _id: beekeeperId },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!beekeeper) {
            return res.status(404).json({ error: 'Beekeeper not found' });
        }

        // Send email with the updated data
        await sendEmail(beekeeper.email || updateFields.email, 
            'Your Information Has Been Updated', 
            `Your information has been updated with the following details:\n${JSON.stringify(updateFields, null, 2)}
            
            If you have any questions, please contact support.
            
            Best regards,
            BeeHive Manager Team`);

        return res.status(200).json({ status: true, message: 'Beekeeper updated successfully', data: beekeeper });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

/**
 * delete a beekeeper
 */
exports.deleteBeekeeper = tryCatch(async (req, res) => {
    console.log(req.params);

    const beekeeper = await BeekeeperModel.findOne({ _id: req.params.id });
    if (!beekeeper) {
        const errorResponse = { statusCode: 404, msg: `${req.params.id} beekeeper not found!` };
        return res.status(404).send(errorResponse);
    }
    await BeekeeperModel.findByIdAndDelete({ _id: req.params.id });

    // Send email to the beekeeper notifying about the deletion
    await sendEmail(beekeeper.email, 'Account Deletion', 
        `Your account has been deleted from our system. 
    
    If you believe this is a mistake, please contact support.
    
    Best regards,
    BeeHive Manager Team`);

    res.status(204).send();
});

/**
 * toggle beekeeper active status
 */
exports.toggleBeekeeperStatus = tryCatch(async (req, res) => {
    const beekeeperId = req.params.id;
    const beekeeper = await BeekeeperModel.findOne({ _id: beekeeperId });

    if (!beekeeper) {
        return res.status(404).json({ error: 'Beekeeper not found' });
    }

    beekeeper.isActive = !beekeeper.isActive;

    const updatedBeekeeper = await beekeeper.save();

    // Send email to notify the beekeeper about the status change
    await sendEmail(beekeeper.email, 'Account Status Change',
         `Your account status has been changed to ${beekeeper.isActive ? 'Active' : 'Inactive'}.
         
         If you have any questions, please contact support.
         
         Best regards,
         BeeHive Manager Team`);

    res.status(200).json({ status: true, message: `Beekeeper ${beekeeper.isActive ? 'activated' : 'deactivated'} successfully`, data: updatedBeekeeper });
});
