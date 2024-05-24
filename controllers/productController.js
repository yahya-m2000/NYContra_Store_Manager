const Product = require("../schema/product");

exports.getQueryProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, ...otherFilters } = req.query;
    const skip = (page - 1) * limit;

    // Create a filters object
    let filters = { ...otherFilters };

    // Add a regex search for the name field if it exists in the query
    if (name) {
      filters.name = new RegExp(name, "i"); // 'i' makes it case-insensitive
    }

    const products = await Product.find(filters)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.json({
      products,
      totalPages,
      currentPage: page,
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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
      colors,
      gender,
      material,
      shippingPolicy,
      isHidden,
      inStock,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      images,
      sizes,
      colors,
      gender,
      material,
      shippingPolicy,
      isHidden,
      inStock,
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
