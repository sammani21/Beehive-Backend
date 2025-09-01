const tryCatch = require("../utils/TryCatch");
const { StandardResponse } = require("../dto/StandardResponse");
const HiveModel = require("../model/hive.model");
const BeekeeperModel = require("../model/beekeeper.model");
const sendEmail = require("../utils/sendEmail");

/**
 * Get all hives
 */
exports.getAllHives = tryCatch(async (req, res) => {
    const hives = await HiveModel.find();
    const response = { statusCode: 200, msg: "OK", data: hives }; 
    res.status(200).json(response);
});

/**
 * Get a hive
 */
exports.getHive = tryCatch(async (req, res) => {
    const hive = await HiveModel.findOne({ id: req.params.id });
    if (!hive) {
        const errorResponse = { statusCode: 400, msg: `${req.params.id} vehicle not found!` };
        return res.status(404).send(errorResponse);
    }
    const response = { statusCode: 200, msg: "OK", data: hive };
    res.status(200).send(response);
});

/**
 * Update hive status (Admin only)
 */


exports.updateHiveStatus = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Active', 'Inactive', 'Maintenance', 'Quarantined'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            statusCode: 400,
            msg: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
    }

    // First get the hive to obtain beekeeper ID
    const hive = await HiveModel.findOne({ id: id });
    if (!hive) {
        return res.status(404).json({
            statusCode: 404,
            msg: `Hive with ID ${id} not found`
        });
    }

    // Update the hive status
    const updatedHive = await HiveModel.findOneAndUpdate(
        { id: id },
        { status },
        { new: true, runValidators: true }
    );

    // Get beekeeper details using the string ID
    const beekeeper = await BeekeeperModel.findOne({ no: hive.beekeeper });

    if (beekeeper?.email) {
        await sendEmail(
            beekeeper.email,
            `Hive Status Updated - ${hive.hiveName || hive.id}`,
            `
            Dear ${beekeeper.username},
            The status of your hive ${hive.hiveName || hive.id} has been updated to ${status}.
            Please take necessary actions if required.
            
            Best regards,
            BeeHive Manager Team
            `
        );
    }

    res.status(200).json({
        statusCode: 200,
        msg: "Hive status updated successfully and email sent to beekeeper",
        data: updatedHive
    });
});