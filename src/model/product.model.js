const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  beekeeper: { // updated from `no` for clarity
    type: Schema.Types.ObjectId,
    ref: 'Beekeeper',
    required: true
  },

  productId: {
    type: String,
    unique: true
  },

  productName: { type: String, required: true }, // e.g. "Raw Honey", "Pure Beeswax"

  productType: { 
    type: String, 
    enum: ["Honey", "Beeswax", "Propolis", "Royal Jelly", "Bee Pollen", "Other"], 
    required: true 
  },

  description: { type: String }, // Optional details about product

  quantity: { type: Number, required: true }, // numeric quantity

  unit: { 
    type: String, 
    enum: ["kg", "g", "liters", "ml", "pieces"], 
    default: "kg" 
  },

  price: { type: Number, required: true }, // per unit price

  harvestDate: { type: Date, required: true }, // when harvested

  expiryDate: { type: Date }, // optional, if perishable

  qualityGrade: { 
    type: String, 
    enum: ["Premium", "Standard", "Organic", "Unspecified"], 
    default: "Unspecified" 
  },

  originLocation: { type: String }, // location of harvest

  // Extra attributes depending on product type
  moistureContent: { type: Number }, // % moisture (for honey)
  waxColor: { type: String }, // for beeswax e.g. "yellow", "white"
  pollenSource: { type: String }, // e.g. "coconut", "mango flowers"
  
  // Approval system fields
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  
  rejectionReason: {
    type: String,
    required: function() {
      return this.status === "rejected";
    }
  },
  
  reviewedAt: {
    type: Date
  }
  
}, { timestamps: true });




const ProductModel = model("Product", productSchema);

module.exports = ProductModel;