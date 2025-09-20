const { model, Schema } = require("mongoose");

const recommendationSchema = new Schema(
  {
    beekeeperId: {
      type: Schema.Types.ObjectId,
      ref: "Beekeeper",
      required: true,
    },
    hiveId: {
      type: Schema.Types.ObjectId,
      ref: "Hive",
      required: true,
    },
    category: {
      type: String,
      enum: ["Maintenance", "Harvest", "Inspection", "Alert"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recommendations: {
    type: String,
    required: true
  },
    status: {
      type: String,
      enum: ["pending", "completed", "dismissed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    date: {
    type: Date,
    default: Date.now
  }
  },
  { timestamps: true }
);

const RecommendationModel = model("Recommendation", recommendationSchema);

module.exports = RecommendationModel;
