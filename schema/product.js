const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shippingPolicy: {
    type: String,
    required: true,
    default: "...",
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // URL paths of product images
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "unisex"],
    required: true,
  },
  inStock: {
    type: Boolean,
  },
  isHidden: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Transform the output to ensure consistent ordering and structure
productSchema.set("toJSON", {
  transform: (doc, ret) => {
    // Order fields as desired
    return {
      id: ret._id,
      name: ret.name,
      description: ret.description,
      shippingPolicy: ret.shippingPolicy,
      price: ret.price,
      category: ret.category,
      brand: ret.brand,
      images: ret.images,
      sizes: ret.sizes,
      colors: ret.colors,
      gender: ret.gender,
      inStock: ret.inStock,
      isHidden: ret.isHidden,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
