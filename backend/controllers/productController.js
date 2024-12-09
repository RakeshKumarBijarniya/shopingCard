const productTable = require("../models/product");
const orderTable = require("../models/orders");
const fs = require("fs");

exports.addProduct = (req, res) => {
  const { name, price, desc, qty } = req.body;
  const image = req.file.filename;

  try {
    if (!name || !price || !desc || !qty) {
      throw new Error("Please Fill all Fields");
    }
    if (!image) {
      throw new Error("Image add Please!!!");
    }
    const newProduct = new productTable({
      name: name,
      desc: desc,
      price: price,
      quentity: qty,
      img: image,
    });
    newProduct.save();
    res.status(201).json({
      status: 201,
      message: "Add New Product Successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const getAllData = await productTable.find();

    res.status(200).json({
      apiData: getAllData,
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUpdateProData = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await productTable.findById(id);
    if (data === undefined) {
      throw new Error("Product not Found");
    }
    res.status(200).json({
      status: 200,
      apiData: data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, desc, price, qty, status } = req.body;
  const image = req.file.filename;

  const { id } = req.params;
  try {
    if (!name || !desc || !price || !qty) {
      throw new Error("Please fill all fields");
    }
    const productData = await productTable.findById(id);
    fs.unlinkSync(`../frontend/shoping-website/public/${productData.img}`);
    const newUpdateData = await productTable.findByIdAndUpdate(id, {
      name: name,
      desc: desc,
      price: price,
      quentity: qty,
      status: status,
      img: image,
    });

    res.status(201).json({
      status: 201,
      message: "Update Product Successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productData = await productTable.findById(id);
    fs.unlinkSync(`../frontend/shoping-website/public/${productData.img}`);
    const delelteItem = await productTable.findByIdAndDelete(id);
    res.status().json({
      status: 200,
      message: "Product Delete Successfully!!!",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.cartDetails = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await productTable.find({ _id: { $in: id } });
    res.status(200).json({
      apiData: data,
      status: 200,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: 500,
    });
  }
};

exports.ordersDispatch = async (req, res) => {
  const { cart, email } = req.body;

  try {
    for (let k in cart.item) {
      const pData = await productTable.findById(k);
      const newOrder = new orderTable({
        username: email,
        pname: pData.name,
        pdesc: pData.desc,
        price: pData.price * cart.item[k],
        quentity: cart.item[k],
      });
      newOrder.save();
    }
    res.status(201).json({
      message: "Order has been successfully Placed",
      status: 201,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      status: 400,
    });
  }
};

exports.myOrder = async (req, res) => {
  try {
    const data = await orderTable.find({ username: req.params.email });

    if (data.length == 0) {
      throw new Error("You have not any order yet!!!");
    }
    res.status(200).json({ data, status: 200 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 500 });
  }
};
