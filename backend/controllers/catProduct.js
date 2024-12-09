const catProductTable = require("../models/categoryProduct");
const orderTable = require("../models/orders");
const fs = require("fs");

exports.addCatProduct = (req, res) => {
  const { name, desc, price, qty, categoryVal } = req.body;
  const image = req.file.filename;

  try {
    if (!name || !desc || !price || !qty) {
      throw new Error("Please fill all the filed");
    }
    if (!categoryVal) {
      throw new Error("Please Choose a Category");
    }

    const newProduct = new catProductTable({
      name: name,
      desc: desc,
      price: price,
      quentity: qty,
      category: categoryVal,
      image: image,
    });

    newProduct.save();

    res.status(201).json({
      message: "Product add Successfully!!!",
      status: 201,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      status: 400,
    });
  }
};

exports.getAllCatProduct = async (req, res) => {
  try {
    const allData = await catProductTable.find();
    res.status(200).json({
      status: 200,
      apiData: allData,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getCatProdData = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await catProductTable.findById(id);
    res.status(200).json({
      data: data,
      status: 200,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      status: 400,
    });
  }
};

exports.deleteCatProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const relatedData = await catProductTable.findById(id);
    fs.unlinkSync(`../frontend/shoping-website/public/${relatedData.image}`);
    await catProductTable.findByIdAndDelete(id);
    res.status(200).json({
      status: 200,
      message: "Product Delete Succssfully!!!",
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateCatProduct = async (req, res) => {
  const id = req.params.id;
  const { name, desc, price, quentity, status, category } = req.body;
  const img = req.file.filename;

  try {
    if (!name || !desc || !price || !quentity || !category) {
      throw new Error("Please fill all the filed");
    }
    const itemData = await catProductTable.findById(id);
    fs.unlinkSync(`../frontend/shoping-website/public/${itemData.image}`);
    await catProductTable.findByIdAndUpdate(id, {
      name: name,
      desc: desc,
      price: price,
      quentity: quentity,
      status: status,
      category: category,
      image: img,
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getProductCategory = async (req, res) => {
  const categoryName = req.query.category;
  try {
    const data = await catProductTable.find({ category: categoryName });
    res.status(200).json({ data: data, status: 200 });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      status: 400,
    });
  }
};

exports.cartDetaling = async (req, res) => {
  const { id } = req.body;

  try {
    const data = await catProductTable.find({ _id: { $in: id } });
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
    for (let i in cart.item) {
      const pData = await catProductTable.findById(i);

      const newOrder = new orderTable({
        username: email,
        pname: pData.name,
        pdesc: pData.desc,
        price: pData.price * cart.item[i],
        quentity: cart.item[i],
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
    const data = await orderTable.find({
      username: req.params.email,
    });
    if (data.length === 0) {
      throw new Error("You have not any order yet!!!");
    }
    res.status(200).json({ data, status: 200 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 500 });
  }
};
