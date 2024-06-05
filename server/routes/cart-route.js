const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../utils/auth-middleware');
const { addProductToCart, fetchCartProducts} = require('../controllers/cart-controller')

router.post('/:account_id',isLoggedIn,addProductToCart);

router.get('/:account_id/products', isLoggedIn, fetchCartProducts);

module.exports = router;
