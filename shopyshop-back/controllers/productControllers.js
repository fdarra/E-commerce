const Product = require("../models/product");

exports.test = async (req, res) => {
  try {
    res.status(200).send("test ok");
  } catch (error) {
    res.status(500).send("test error");
  }
};

//// Add Products
exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      gender,
      category,
      type,
      color,
      price,
      image,
      size,
      countInStock,
      rating,
      numReviews,
    } = req.body;
    // Basic input validation
    if (
      !title ||
      !gender ||
      !category ||
      !type ||
      !color ||
      !price ||
      !size ||
      !countInStock
    ) {
      return res
        .status(400)
        .json({ msg: "All required fields must be provided." });
    }
    const newProduct = new Product({
      title,
      gender,
      category,
      type,
      color,
      price,
      image,
      size,
      countInStock,
      rating,
      numReviews,
    });
    await newProduct.save();
    res.status(200).send({ msg: "product added successfully", newProduct });
  } catch (error) {
    res.status(500).send({ msg: "product not added successfully", error });
  }
};

// Get all products

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.status(400).send({ msg: " No products found" });
    else res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ msg: "error geting products", error });
  }
};

////Delete Product

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted)
      return res.status(400).send({ msg: "No product found" });
    else res.status(200).send({ msg: "Product deleted", productDeleted });
  } catch (error) {
    res.status(500).send({ msg: "error deleting product", error });
  }
};

////Update Product

exports.editeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      gender,
      category,
      type,
      color,
      price,
      image,
      size,
      countInStock,
      rating,
      numReviews,
    } = req.body;
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        title,
        gender,
        category,
        type,
        color,
        price,
        image,
        size,
        countInStock,
        rating,
        numReviews,
      },
      { new: true }
    );
    if (!productUpdated)
      return res.status(400).send({ msg: "No product found" });
    else res.status(200).send({ msg: "Product updated", productUpdated });
  } catch (error) {
    res.status(500).send({ msg: "error updating product", error });
  }
};

// get distinct Gender

exports.getDistinctGender = async (req, res) => {
  try {
    const genders = await Product.distinct("gender");
    if (!genders) return res.status(400).send({ msg: " No gender found" });
    else res.status(200).send(genders);
  } catch (error) {
    res.status(500).send({ msg: "error geting genders", error });
  }
};

// get distinct Category
exports.getDistinctCategory = async (req, res) => {
  try {
    const categorys = await Product.distinct("category");
    if (!categorys) return res.status(400).send({ msg: " No category found" });
    else res.status(200).send(categorys);
  } catch (error) {
    res.status(500).send({ msg: "error geting categorys", error });
  }
};

///// get products by gender & category

exports.getProductBygenderByCategory = async (req, res) => {
  try {
    const { gend, catego } = req.params;

    const Founded = await Product.find({ gender: gend, category: catego });

    if (!Founded || Founded.length === 0)
      return res.status(400).send({ msg: "No product found" });
    else res.status(200).send({ msg: "Product found", Founded });
  } catch (error) {
    res.status(500).send({ msg: "error geting product", error });
  }
};

///// get products by gender & category distinct titles

exports.getProductBygenderByCategoryDistinctTitles = async (req, res) => {
  try {
    const { gend, catego } = req.params;
    const Founded = await Product.aggregate([
      { $match: { gender: gend, category: catego } },
      {
        $group: {
          _id: "$title",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
    ]);
    if (!Founded || Founded.length === 0)
      return res.status(400).send({ msg: "No product found" });
    else res.status(200).send({ msg: "Product found", Founded });
  } catch (error) {
    res.status(500).send({ msg: "error geting product", error });
  }
};

//// get product by id

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productFounded = await Product.findById(id);

    if (!productFounded)
      return res.status(400).send({ msg: "No product found" });
    else res.status(200).send({ msg: "Product found", productFounded });
  } catch (error) {
    res.status(500).send({ msg: "error geting product", error });
  }
};

// Get all distinct colors by title

exports.getColors = async (req, res) => {
  try {
    const { title } = req.params;
    console.log("params:::::", title);
    const colors = await Product.distinct("color", { title: title });
    const sizes = await Product.distinct("size", { title: title });
    console.log("colors:::::", sizes);
    if (!colors) return res.status(400).send({ msg: " No products found" });
    else res.status(200).send({ colors, sizes });
  } catch (error) {
    res.status(500).send({ msg: "error geting products", error });
  }
};


exports.getAllSizes= async(req,res) =>{
  try {
    const sizes = await Product.find({}, { title: 1, size: 1, _id: 0 });
    
    if (!sizes) return res.status(400).send({ msg: " No products found" });
    else res.status(200).send( sizes );
  } catch (error) {
    res.status(500).send({ msg: "error geting sizes", error });
  }

}
