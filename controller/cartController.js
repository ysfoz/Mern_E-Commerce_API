const Cart = require("../models/Cart");


// not used
exports.createCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// create or update +
exports.createOrUpdateCart = async (req, res) => {
  
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


// update product quantity and saveforlater
exports.updateProductInCart= async(req,res)=>{
try {
  const product = await Cart.updateOne({userId: req.params.id,"products._id":req.body.id},
    {
    $set:{'products.$.quantity' : req.body.quantity, 'products.$.saveForLater' : req.body.saveForLater}
    }
  )
    res.status(200).json(product)
} catch (error) {
  res.status(500).json(error);
}
}



// delete cart - all cart 
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete({ userId: req.params.userId });
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};


// delete one product from cart +
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
