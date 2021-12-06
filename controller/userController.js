const cryptoJS = require("crypto-js");
const UserModel = require("../models/User");

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email:req.body.email,
          password:req.body.password,
          img:req.body.img,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted . . .");
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
