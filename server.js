const stripe = require('stripe')('sk_test_51IAaoxGgsOqNsdKabLNV8qR2OiOwOYBnMrF0nYdRqo7Q0quS6TKAf0Uf12imjZt6gzf9W1z2WD76mjyXiTJSlhTP00OGRtRbZ3');
const express = require('express');
const cors = require('cors');
const app = express();

var price;
const port = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:5501';

app.post('/price', function (req, res) {
  let priceObject= (req.body);
  price= priceObject.Price;
  price=price.replace(/\,/g,'');
  console.log(price);
  res.send();
})

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Personal services',
            images: ['http://127.0.0.1:5501/img/Bills.jpg'],
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(port, () => console.log('Running on port ' + port));