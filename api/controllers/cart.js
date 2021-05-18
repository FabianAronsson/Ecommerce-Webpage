const mongoose = require('mongoose');
require('../models/productModel');

const User = mongoose.model('User');

const Product = mongoose.model('Product');

module.exports.updateCart = (req, res) => {
    //If no user ID exists in the JWT return a 401
    if (!req.body._id) {
        res.status(401).json({
            message: 'UnauthorizedError: private profile'
        });
    } else {
        //Otherwise continue
        User.findById(req.body._id).exec(function(err, user) {
            mongoose.set('useFindAndModify', false);
            User.findOneAndUpdate({ _id: req.body._id }, { productName: req.body.productID, productAmount: req.body.productAmount }).then(function() {
                User.findById({ _id: req.body._id }).then(function(result) {
                    //success? for debug purposes
                })
            })
            res.status(200).json(user);
        });
    }
};


//Gets the user's cart
module.exports.getUserCart = (req, res) => {
    // If no user ID exists in the JWT return a 401
    if (!req.body._id) {
        res.status(401).json({
            message: 'UnauthorizedError: private profile'
        });
    } else {
        // Otherwise continue
        Product.findOne(req.body.productName).exec(function(err, cart) {
            res.status(200).json(cart);
        });
    }
};