const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const { createCart, updateCart,deleteCart, getCart, getAllCarts } = require("../controller/cartController");

router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization,updateCart)
router.delete("/:id", verifyTokenAndAuthorization, deleteCart)
router.get("find/:userId",verifyTokenAndAuthorization, getCart)
router.get("/",verifyTokenAndAuthorization, getAllCarts)