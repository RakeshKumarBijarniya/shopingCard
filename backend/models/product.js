const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
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
  status: {
    type: String,
    required: true,
    default: "active",
  },
  img: {
    type: String,
  },
  addProductDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("products", productSchema);
