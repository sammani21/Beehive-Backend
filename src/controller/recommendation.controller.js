const RecommendationModel = require("../model/recommendation.model");
const BeekeeperModel = require("../model/beekeeper.model");
const HiveModel = require("../model/hive.model");

// Get all recommendations
exports.getAllRecommendations = async (req, res, next) => {
  try {
    const recommendations = await RecommendationModel.find()
      .populate("beekeeperId", "name username email")
      .populate("hiveId", "hiveId hiveName location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      statusCode: 200,
      msg: "All recommendations retrieved successfully",
      data: recommendations,
    });
  } catch (err) {
    next(err);
  }
};

// Get recommendations by beekeeper
exports.getRecommendationsByBeekeeper = async (req, res, next) => {
  try {
    const { beekeeperId } = req.params;

    const recommendations = await RecommendationModel.find({ beekeeperId })
      .populate("hiveId", "hiveId hiveName location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      statusCode: 200,
      msg: "Recommendations retrieved successfully",
      data: recommendations,
    });
  } catch (err) {
    next(err);
  }
};


// Delete recommendation
exports.deleteRecommendation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recommendation = await RecommendationModel.findByIdAndDelete(id);

    if (!recommendation) {
      return res.status(404).json({
        statusCode: 404,
        msg: "Recommendation not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      msg: "Recommendation deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
