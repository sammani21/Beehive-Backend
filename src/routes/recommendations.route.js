const { Router } = require("express");
const {
  getAllRecommendations,
  getRecommendationsByBeekeeper,
  getHivesByBeekeeper,
  createRecommendation,
  updateRecommendationStatus,
  deleteRecommendation
} = require("../controller/recommendation.controller");

const router = Router();

router.get("/", getAllRecommendations);
router.get("/byBeekeeper/:beekeeperId", getRecommendationsByBeekeeper);
router.get("/hives/:beekeeperId", getHivesByBeekeeper);
router.post("/", createRecommendation);
router.patch("/:id/status", updateRecommendationStatus);
router.delete("/:id", deleteRecommendation);

module.exports = router;