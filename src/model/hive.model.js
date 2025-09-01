const { model, Schema } = require("mongoose");
//const CounterModel = require('./counter.model');

const hiveSchema = new Schema({
beekeeper: { 
    type: String,  // Changed from Schema.Types.String
    required: true
  },
  hiveName: { type: String, required: true },
  hiveType: { type: String, required: true },
  establishedYear: { type: Date, required: true },
  /*lastInspection: { type: Date, required: true },*/
  strength: { 
    type: Number, 
    min: 1, 
    max: 10,
    required: true
  },
  queenStatus: { 
    type: String, 
    enum: ['Present', 'Not Present', 'Unknown'],
    required: true
  },
  broodPattern: { 
    type: String, 
    enum: ['Solid', 'Spotty', 'None', 'Other'],
    required: true
  },

  honeyStores: { 
    type: Number, 
    min: 0, 
    max: 100,
    required: true
  },
  pestLevel: { 
    type: Number, 
    min: 0, 
    max: 10,
    required: true
  },
  diseaseSigns: { 
    type: [String], 
    default: [] 
  },
  location: { type: String, required: true },
  population: { type: Number, min: 0, required: true },

    id: {
        type: String,
        unique: true
    },
    status: {
    type: String,
    enum: ['Active', 'Inactive', 'Maintenance', 'Quarantined'],
    default: 'Active'
  }
    /*no: {
        type: String,
        required: true,
        unique: true
    },*/
    /*type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    },*/
    /*establishedYear: {
        type: Date,
        required: true
    },*/
    /*status: {
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
    }*/
}, { timestamps: true });



const HiveModel = model("Hive", hiveSchema);

module.exports = HiveModel;