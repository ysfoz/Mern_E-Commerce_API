const router = require("express").Router();
const { makePayment,refundPayment } = require("../controller/stripeController");

router.post("/payment", makePayment);
router.post("/refund", refundPayment);

module.exports = router;
