const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedPoduct = await newProduct.save();
    res.status(200).json(savedPoduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const selectedProduct = await Product.findById(req.params.id);
    res.status(200).json(selectedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
