const tryCatch = require("../utils/TryCatch");
const StandardResponse = require("../dto/StandardResponse");
const HiveModel = require("../model/hive.model");

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
    
    // Validate status
    const validStatuses = ['Active', 'Inactive', 'Maintenance', 'Quarantined'];
    if (!validStatuses.includes(status)) {
        const errorResponse = { 
            statusCode: 400, 
            msg: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
        };
        return res.status(400).json(errorResponse);
    }
    
    const hive = await HiveModel.findOneAndUpdate(
        { id: id },
        { status: status },
        { new: true, runValidators: true }
    );
    
    if (!hive) {
        const errorResponse = { statusCode: 404, msg: `Hive with ID ${id} not found` };
        return res.status(404).json(errorResponse);
    }
    
    const response = { statusCode: 200, msg: "Hive status updated successfully", data: hive };
    res.status(200).json(response);
});