const router = require("express").Router();
const { makePayment } = require("../controller/stripeController");

router.post("/payment", makePayment);

module.exports = router;
