const { model, Schema } = require("mongoose");

const recommendationsSchema = new Schema({
  beekeeperId: {
    type: Schema.Types.ObjectId,
    ref: 'Beekeeper',
    required: true
  },
  hiveId: {
    type: Schema.Types.ObjectId,
    ref: 'Hive',
    required: true
  },
  category: {
    type: String,
    enum: ['Maintenance', 'Harvest', 'Inspection', 'Alert'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Dismissed'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  id: {
    type: String,
    unique: true
  }
}, { timestamps: true });

const RecommendationsModel = model("Recommendation", recommendationsSchema);

module.exports = RecommendationsModel;