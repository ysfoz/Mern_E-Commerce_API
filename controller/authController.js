const UserModel =require("../models/User")
const CryptoJS = require("crypto-js")

exports.userRegister = async(req,res) => {
 const newUser = new UserModel({
     username:req.body.username,
     email:req.body.email,
     password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY.toString())
 })

 try {
     const savedUser = await newUser.save();
     res.status(201).json(savedUser)
 } catch (error) {
     res.status(500).json(error)
 }
}