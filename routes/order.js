const router = require("express").Router();

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getIncome,
} = require("../controller/orderController");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
router.get("/", verifyTokenAndAdmin, getAllOrder);
router.get("/income", verifyTokenAndAdmin, getIncome);

module.exports = router;
