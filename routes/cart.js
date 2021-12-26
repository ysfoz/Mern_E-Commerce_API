const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");

const {
  createCart,
  updateProductInCart,
  deleteCart,
  getCart,
  getAllCarts,
  deleteProductfromCart,
  createOrUpdateCart,
  
} = require("../controller/cartController");

router.post("/", verifyToken, createCart);
router.post("/:id", verifyTokenAndAuthorization, createOrUpdateCart);
router.put("/:id", verifyTokenAndAuthorization, updateProductInCart);
router.post("/delete/:id", verifyTokenAndAuthorization, deleteProductfromCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAndAuthorization, getAllCarts);

module.exports = router;
