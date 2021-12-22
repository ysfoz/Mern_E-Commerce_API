const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateSalesAmount
} = require("../controller/productController");
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.put("/saleupdate/:id", verifyTokenAndAuthorization, updateSalesAmount);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);

module.exports = router;
