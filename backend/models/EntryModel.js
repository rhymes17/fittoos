const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please include a title"],
    },
    category: {
      type: String,
      required: [true, "Please include the category"],
    },
    source: {
      type: String,
    },
    entryType: {
      type: Boolean,
      required: [true, "Please specify the entry type"],
    },
    date: {
      type: String,
      required: [true, "Please add the date of the entry"],
    },
    description: {
      type: String,
    },
    amount: {
      type: String,
      required: [true, "Please add the amount"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);
