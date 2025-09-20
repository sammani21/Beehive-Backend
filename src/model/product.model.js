const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  beekeeper: { 
    type: String,  
    required: true
  },
  productId: {
    type: String,
    unique: true
  },
  productName: { 
    type: String, 
    required: true 
  }, 
  productType: { 
    type: String, 
    enum: ["Honey", "Beeswax", "Propolis", "Royal Jelly", "Bee Pollen", "Other"], 
    required: true 
  },
  description: { 
    type: String 
  }, 
  quantity: { 
    type: Number, 
    required: true 
  }, 
  unit: { 
    type: String, 
    enum: ["kg", "g", "liters", "ml", "pieces"], 
    default: "kg" 
  },
  price: { 
    type: Number, 
    required: true 
  }, 
  harvestDate: { 
    type: Date, 
    required: true 
  }, 
  expiryDate: { 
    type: Date 
  }, 
  qualityGrade: { 
    type: String, 
    enum: ["Premium", "Standard", "Organic", "Unspecified"], 
    default: "Unspecified" 
  },
  originLocation: { 
    type: String 
  }, 
  moistureContent: { 
    type: Number 
  }, 
  waxColor: { 
    type: String 
  }, 
  pollenSource: { 
    type: String 
  }, 
  status: {
    type: String,
    enum: ["approved", "rejected"],
    default: "approved"
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