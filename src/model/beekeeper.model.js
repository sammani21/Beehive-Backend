const { model, Schema } = require("mongoose");
//const CounterModel = require('./counter.model');

const beekeeperSchema = new Schema({
    no: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    dob: {
        type: Date,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

beekeeperSchema.pre('save', async function (next) {
    const beekeeper = this;
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: 'beekeeperNo' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    beekeeper.no = `B${counter.seq.toString().padStart(3, '0')}`;
    next();
  });

const BeekeeperModel = model("Beekeeper", beekeeperSchema);

module.exports = BeekeeperModel;
