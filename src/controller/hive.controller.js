const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const HiveModel = require("../model/hive.model");
const { Hive } = require("../types/SchemaTypes");

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

