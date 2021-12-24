const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");

const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
  deleteProductfromCart
} = require("../controller/cartController");

router.post("/", verifyToken, createCart);
router.post("/:id", verifyTokenAndAuthorization, updateCart);
router.post("/delete/:id", verifyTokenAndAuthorization, deleteProductfromCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAndAuthorization, getAllCarts);

module.exports = router;
