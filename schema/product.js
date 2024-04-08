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
  images: [
    {
      type: String, // URL paths of product images
      required: true,
    },
  ],
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  colors: [
    {
      type: String,
      required: true,
    },
  ],
  gender: {
    type: String,
    enum: ["male", "female", "unisex"],
    required: true,
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
