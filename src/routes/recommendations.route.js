const express = require("express");
const router = express.Router();
const recommendationController = require("../controller/recommendation.controller");

// Routes
router.get("/", recommendationController.getAllRecommendations);
router.get("/beekeeper/:beekeeperId", recommendationController.getRecommendationsByBeekeeper);
router.delete("/:id", recommendationController.deleteRecommendation);

module.exports = router;
