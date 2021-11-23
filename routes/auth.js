const router = require("express").Router()
const { userRegister } = require("../controller/authController")


router.post("/register", userRegister )

module.exports = router;