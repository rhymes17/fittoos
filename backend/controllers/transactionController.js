const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Entry = require("../models/EntryModel");

// @desc Create a new transaction
// @route POST '/api/transaction/createTransacton'
// @access Private
const createTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const { category, source, entryType, date, title, description, amount } =
    req.body;

  if (!category || !date || !amount || !title) {
    res.status(400);
    throw new Error("Please include all required fields");
  }

  const entry = await Entry.create({
    user: user._id,
    category,
    source,
    title,
    entryType,
    date,
    description,
    amount,
  });

  res.status(200).json(entry);
});

// @desc Update the transaction
// @route PUT '/api/updateTransaction/:id'
// @access Private
const updateTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Find the transaction
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error("Entry doesn't exists");
  }

  //Check if entry belongs to the user
  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEntry);
});

// @desc Get Transactions
// @route GET '/api/transaction/:id'
// @access Private
const getTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //Check for the transaction
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error("Entry doesn't exists");
  }

  //Check if entry belong to user
  if (entry.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Entry doesn't belong to the current user");
  }

  res.status(200).json(entry);
});

// @desc Get Transactions
// @route GET '/api/transaction/'
// @access Private
const getTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const entries = await Entry.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(entries);
});

// @desc Delete a transaction
// @route DELETE '/api/transaction/delete/:id'
// @access Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //Check for the transaction
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error("Entry doesn't exists");
  }

  //Check if entry belong to user
  if (entry.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Entry doesn't belong to the current user");
  }

  await Entry.deleteOne(entry._id);
  res.status(200).json({ message: "Deleted successfully" });
});

module.exports = {
  createTransaction,
  updateTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
};
