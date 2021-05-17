const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlCart = require('../controllers/cart');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/cart', ctrlCart.updateCart);
router.post('/showCart', ctrlCart.getUserCart);
router.post('/user', ctrlProfile.profileRead)

router.get('/home', ctrlProfile.profileRead)

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;