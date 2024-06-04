const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.use(express.json());
app.use('/api/products',require('./routes/products-route'));
app.use('/api/registration',require('./routes/registration-route'));
app.use('/api/auth',require('./routes/auth-route'));
app.use('/api/cart',require('./routes/cart-route'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message || err });
});

app.listen(PORT, ()=>{
    console.log("Listening on port:",PORT);
});



