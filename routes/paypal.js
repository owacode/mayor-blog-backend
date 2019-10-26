const express= require('express');
const route= express.Router();

const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARCmNkw1TRcK7j1AmZDtPPo2K3FtjFLXFQI1Ez372oaJx9el5qYbn5m9kj7MVcWPmCWucS9miLLMjrGq',
  'client_secret': 'EPOSUnsWwvltHxyQVje32PqKRjhJCOmBIleGZELdlMqcD1q07U7isuj5VU8adxFA3ssDVTJ6_BvBg2Xe'
});

route.get('/pay', (req, res) => {
  console.log('pay hit')
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "https://paypal-testing-api.herokuapp.com/success",
        "cancel_url": "https://paypal-testing-api.herokuapp.com/failed"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "INR",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "INR",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
    console.log('payment',payment)
    for(let i = 0;i < payment.links.length;i++){
      if(payment.links[i].rel === 'approval_url'){
        res.status(200).redirect(payment.links[i].href);
      }
    }
  }
});

});

route.get('/success', (req, res) => {
  console.log('success')
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "INR",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error);
        //throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.json({
          payment:payment
        });
    }
});
});

route.get('/failed', (req, res) => {
  res.json({
    msg:"Payment Failed"
  })
});
 module.exports= route;
