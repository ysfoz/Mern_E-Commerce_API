const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCart = async (req, res) => {
  // try {
  //   const updatedCart = await Cart.findOneAndUpdate(
  //     {userId : req.params.userId},
  //     {
  //       $setOnInsert:{"userId":req.params},
  //       $push: {"products":req.body}

  //     },
  //     { new: true, upsert:true }
  //   );
  //   res.status(200).json(updatedCart);
  // }
  try {
    const cart = await Cart.findOne({ userId: req.params.id});
    if (!cart) {
      const cart = new Cart({products:req.body,userId:req.params.id});
      
      const savedCart = await cart.save();
      res.status(201).json(savedCart);
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.params.id },
        {
          $push: { products: req.body },
        },
        { new: true }
      );
      
      res.status(200).json(updatedCart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteProductfromCart = async(req,res)=>{
  try {
    await Cart.findOneAndUpdate(
      {userId: req.params.id},
      {
        $pull:{products:{_id:req.body.id}}
      }
      )
      res.status(200).json("A product has been deleted from your cart")
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const allCarts = await Cart.find();
    res.status(200).json(allCarts);
  } catch (error) {
    res.status(500).json(error);
  }
};
