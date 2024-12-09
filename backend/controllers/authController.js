const userAccount = require("../models/userAccounts");
const bcrypt = require("bcrypt");

exports.createAccount = async (req, res) => {
  const { fname, lname, email, password, cPassword } = req.body;
  try {
    const checkAccount = await userAccount.findOne({ email: email });
    if (!fname || !lname || !email || !password || !cPassword) {
      throw new Error("Please Fill all fields!!!");
    }
    if (checkAccount) {
      throw new Error(`${email} Already Exist!!!`);
    }
    if (password !== cPassword) {
      throw new Error("Password, Confirm Password Does Not Matched!!!");
    }
    const bPassword = await bcrypt.hash(password, 10);
    const newUser = new userAccount({
      fname: fname,
      lname: lname,
      email: email,
      password: bPassword,
    });
    newUser.save();
    res
      .status(201)
      .json({
        message: "Successfully Account has been Created!!!",
        status: 201,
      });
  } catch (e) {
    res.status(400).json({ message: e.message, status: 400 });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error("Please fill all fields");
    }

    const findAccount = await userAccount.findOne({ email: username });
    if (!findAccount) {
      throw new Error("Username Not Registered!!!");
    }

    const comparePassword = await bcrypt.compare(
      password,
      findAccount.password
    );

    if (!comparePassword) {
      throw new Error("Password does not Matched!!!");
    }
    res.status(200).json({
      data: findAccount,
      message: "User Login Successfully",
      status: 200,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      status: 400,
    });
  }
};
