
const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY

const stripe = require("stripe")(KEY)

exports.makePayment = async(req, res) => {
  await stripe.charges.create(
    {
      source: req?.body?.tokenId,
      amount: req?.body?.amount,
      currency: "usd",
    },
    
    (stripeErr, stripeRes) => {
 
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
}

exports.refundPayment = async(req, res) =>{
 await stripe.refunds.create({
  charge: req.body,
})
}