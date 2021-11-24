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
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUser = async(req,res) => {
 try {
   await UserModel.findByIdAndDelete(req.params.id)
   res.status(200).json("User has been deleted . . .")
 } catch (error) {
   res.status(500).json(error)
 }
 
  
}
exports.getUser = async(req,res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
 
  
}
