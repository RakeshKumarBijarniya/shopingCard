const mongoose = require("mongoose");

const orderShema = mongoose.Schema({
  username: {
    type: String,
  },
  pname: {
    type: String,
  },
  pdesc: {
    type: String,
  },
  price: {
    type: Number,
  },
  quentity: {
    type: Number,
  },
  paddDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("order", orderShema);
