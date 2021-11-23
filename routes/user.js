const { getTest, postTest } = require("../controller/userController")

const router = require("express").Router()


router.get('/usertest', getTest)
router.post('/posttest',postTest)

module.exports = router