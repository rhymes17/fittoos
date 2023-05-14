const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");

// @desc Create a new category
// @route POST '/api/category/'
// @access Public
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //Check if already exists
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
  });

  res.status(201).json(category);
});

// @desc Get categories
// @route GET '/api/category/'
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const category = await Category.find();

  res.status(200).json(category);
});

module.exports = {
  createCategory,
  getCategories,
};
