const tryCatch = require("../utils/TryCatch");
const StandardResponse = require("../dto/StandardResponse");
const RecommendationModel = require("../model/recommendation.model");
const BeekeeperModel = require("../model/beekeeper.model");
const HiveModel = require("../model/hive.model");
const { sendEmail } = require("../utils/sendEmail");

/**
 * Get all recommendations
 */
exports.getAllRecommendations = tryCatch(async (req, res) => {
    const recommendations = await RecommendationModel.find()
        .populate("beekeeperId")
        .populate("hiveId");
    
    const response = new StandardResponse(200, "OK", recommendations);
    res.status(200).json(response);
});

/**
 * Get recommendations by beekeeper
 */
exports.getRecommendationsByBeekeeper = tryCatch(async (req, res) => {
    const { beekeeperId } = req.params;
    
    const recommendations = await RecommendationModel.find({ beekeeperId })
        .populate("hiveId")
        .sort({ createdAt: -1 });
    
    const response = new StandardResponse(200, "OK", recommendations);
    res.status(200).json(response);
});

/**
 * Get hives by beekeeper
 */
exports.getHivesByBeekeeper = tryCatch(async (req, res) => {
    const { beekeeperId } = req.params;
    
    const hives = await HiveModel.find({ beekeeper: beekeeperId });
    
    const response = new StandardResponse(200, "OK", hives);
    res.status(200).json(response);
});

/**
 * Create a new recommendation
 */
exports.createRecommendation = tryCatch(async (req, res) => {
    const { beekeeperId, hiveId, category, message } = req.body;

    // Validate input
    if (!beekeeperId || !hiveId || !category || !message) {
        const errorResponse = new StandardResponse(400, "All fields are required");
        return res.status(400).json(errorResponse);
    }

    // Check if beekeeper exists
    const beekeeper = await BeekeeperModel.findById(beekeeperId);
    if (!beekeeper) {
        const errorResponse = new StandardResponse(404, "Beekeeper not found");
        return res.status(404).json(errorResponse);
    }

    // Check if hive exists and belongs to the beekeeper
    const hive = await HiveModel.findOne({ _id: hiveId, beekeeper: beekeeperId });
    if (!hive) {
        const errorResponse = new StandardResponse(404, "Hive not found or does not belong to this beekeeper");
        return res.status(404).json(errorResponse);
    }

    // Create recommendation
    const recommendation = await RecommendationModel.create({
        beekeeperId,
        hiveId,
        category,
        message,
    });

    // Send email notification to beekeeper
    try {
        const emailSubject = `New Recommendation for Hive ${hive.hiveId}`;
        const emailText = `
            Dear ${beekeeper.name},
            
            You have a new recommendation for your hive ${hive.hiveId}:
            
            Category: ${category}
            Message: ${message}
            
            Please log in to your account to view more details.
            
            Best regards,
            Beehive Management Team
        `;

        await sendEmail(beekeeper.email, emailSubject, emailText);
    } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // We don't want to fail the whole request if email fails
    }

    const response = new StandardResponse(201, "Recommendation created successfully", recommendation);
    res.status(201).json(response);
});

/**
 * Update recommendation status
 */
exports.updateRecommendationStatus = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'completed', 'dismissed'];
    if (!validStatuses.includes(status)) {
        const errorResponse = new StandardResponse(400, `Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        return res.status(400).json(errorResponse);
    }
    
    const recommendation = await RecommendationModel.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
    
    if (!recommendation) {
        const errorResponse = new StandardResponse(404, `Recommendation with ID ${id} not found`);
        return res.status(404).json(errorResponse);
    }
    
    const response = new StandardResponse(200, "Recommendation status updated successfully", recommendation);
    res.status(200).json(response);
});

/**
 * Delete a recommendation
 */
exports.deleteRecommendation = tryCatch(async (req, res) => {
    const { id } = req.params;
    
    const recommendation = await RecommendationModel.findByIdAndDelete(id);
    
    if (!recommendation) {
        const errorResponse = new StandardResponse(404, `Recommendation with ID ${id} not found`);
        return res.status(404).json(errorResponse);
    }
    
    const response = new StandardResponse(200, "Recommendation deleted successfully");
    res.status(200).json(response);
});