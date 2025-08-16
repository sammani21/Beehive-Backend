const { model, Schema } = require("mongoose");
const CounterModel = require('./counter.model');

const hiveSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    no: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    },
    establishedYear: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    queenBreed: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    products: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    }
}, { timestamps: true });

hiveSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await CounterModel.findByIdAndUpdate(
            { _id: 'hiveId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.id = `H${counter.seq.toString().padStart(3, '0')}`;
    }
    next();
});

const HiveModel = model("Hive", hiveSchema);

module.exports = HiveModel;