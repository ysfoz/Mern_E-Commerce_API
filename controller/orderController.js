const Order = require("../models/Order")

exports.createOrder = async(req,res) =>{
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateOrder = async(req,res) => {
    
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },
        {new:true}
        )
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteOrder = async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("An order has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getOrder = async(req,res) => {
    try {
        const orders = await Order.find({ userId : req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllOrder = async(req,res) => {
    try {
        orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}