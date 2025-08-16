const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const HiveModel = require("../model/hive.model");
const { Hive } = require("../types/SchemaTypes");

/**
 * Get all hives
 */
exports.getAllHives = tryCatch(async (req, res) => {
    const hives = await HiveModel.find();
    res.status(200).json(hives);
});

/**
 * Get a hive
 */
exports.getHive = tryCatch(async (req, res) => {
    const hive = await HiveModel.findOne({ id: req.params.id });
    if (!hive) {
        return res.status(404).json({ error: `${req.params.id} hive not found` });
    }
    res.status(200).json(hive);
});

module.exports = { getAllHives, getHive };