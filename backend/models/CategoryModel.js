const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name of the category"],
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
