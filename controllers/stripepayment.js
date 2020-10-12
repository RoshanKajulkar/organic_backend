const stripe = require("stripe")("sk_test_51HZtvCE9V1Mh9c70sMFiQtw7c8vo41zp3tfmA1hgWu0SFwy4u2gKbwq5qFsiA0LilP8PUUF8VwIGcyvY1jJMGJdA00NEwiLax8");
const { v4: uuidv4 } = require('uuid');
exports.makepayment = (req, res) => {
  const { token } = req.body;
 
  let amount = 10;
  
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
          },
          {
            idempotencyKey
          }
        )
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    })
    .then(()=>
      
    {res.json({"success":"true"}
    );
    console.log("success")})
    .catch((e)=>console.log(e));
};
