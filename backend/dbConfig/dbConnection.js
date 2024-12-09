const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/shopingCard")
  .then(() => {
    console.log("db Connected Successfully");
  })
  .catch(() => {
    console.log("db not connected");
  });
