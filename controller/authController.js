const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    img:req.body.img,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY.toString()
    ),
    
  });

exports.userAdminRegister = async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    img:req.body.img,
    isAdmin:req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY.toString()
    ),
    
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET_KEY
    );
    const Orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    Orginalpassword !== req.body.password &&
      res.status(401).json("Wrong creditials!");

    jwtToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, jwtToken });
  } catch (error) {
    res.status(500).json(error);
  }
};
