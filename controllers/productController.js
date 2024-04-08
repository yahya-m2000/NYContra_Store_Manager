const Product = require("../schema/product");

exports.getQueryProducts = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // Set default values for pagination and limiting
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : 10;

    // Calculate the number of documents to skip
    let skip = (page - 1) * limit;

    for (const key in query) {
      if (key === "page" || key === "limit") {
        continue;
      }

      filter[key] = query[key];
    }

    const products = await Product.find(filter).skip(skip).limit(limit).exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      images,
      sizes,
      color,
      gender,
      material,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      images,
      sizes,
      color,
      gender,
      material,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const productIds = req.query.id;

    // Find and delete products by IDs
    const deletedProducts = await Product.deleteMany({
      _id: { $in: productIds },
    }).exec();

    if (deletedProducts.deletedCount === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.json({
      message: "Products deleted successfully",
      deletedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const productId = req.query.id;
    const updates = req.body;

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    }).exec();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
