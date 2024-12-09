const mongoose = require("mongoose");
const categoryProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quentity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  addProductDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("categoryProduct", categoryProductSchema);
