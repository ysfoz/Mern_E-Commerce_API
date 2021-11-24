const { updateUser } = require("../controller/userController")
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken")

const router = require("express").Router()


router.put("/:id",verifyTokenAndAuthorization, updateUser)


module.exports = router