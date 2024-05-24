// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../schema/product");

const productController = require("../controllers/productController");

// get a product by querying key
router.get("/", productController.getQueryProducts);

// add a new product
router.post("/", productController.addProduct);

// delete a product by ID
router.delete("/", productController.deleteProductById);

// update a product by id
router.put("/", productController.updateProductById);

module.exports = router;
