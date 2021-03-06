const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  getStats,
} = require("../controller/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.put("/adminupdate/:id", verifyTokenAndAdmin, updateUser);
router.delete("/:id", verifyTokenAndAuthorization , deleteUser);
router.delete("/:id", verifyTokenAndAdmin, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUser);
router.get("/stats", verifyTokenAndAdmin, getStats);

module.exports = router;
