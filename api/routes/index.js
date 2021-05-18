const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlCart = require('../controllers/cart');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const auth = jwt({
    secret: 'Q8bb6MC*^ec9uf$rgcVS^Z$9$4CnPND-zYhg%hj&K3Nq+cMzm^b!cTc#Lv-TKAzh',
    userProperty: 'payload'
});


//profile
router.get('/profile', auth, ctrlProfile.profileRead);

//cart
router.post('/cart', ctrlCart.updateCart);
router.post('/showCart', ctrlCart.getUserCart);
router.post('/user', ctrlProfile.profileRead)

router.get('/home', ctrlProfile.profileRead)

//authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;