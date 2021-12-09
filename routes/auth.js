const router = require("express").Router();
const { userRegister, userLogin, userAdminRegister } = require("../controller/authController");
const {
    verifyTokenAndAdmin
  } = require("../middleware/verifyToken");


router.post("/register", userRegister);
router.post("/adminregister",verifyTokenAndAdmin, userAdminRegister);
router.post("/login", userLogin);

module.exports = router;
