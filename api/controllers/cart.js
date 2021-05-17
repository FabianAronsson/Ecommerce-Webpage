const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.updateCart = (req, res) => {
    // If no user ID exists in the JWT return a 401
    if (!req.body._id) {
        res.status(401).json({
            message: 'UnauthorizedError: private profile'
        });
    } else {
        // Otherwise continue
        User.findById(req.body._id).exec(function(err, user) {
            mongoose.set('useFindAndModify', false);
            User.findOneAndUpdate({ _id: req.body._id }, { productName: req.body.productID, productAmount: req.body.productAmount }).then(function() {
                User.findById({ _id: req.body._id }).then(function(result) {
                    console.log(result)
                })
            })
            res.status(200).json(user);
        });
    }
};


//CHANGE
module.exports.getUserCart = (req, res) => {

    console.log("asdasd")
        // If no user ID exists in the JWT return a 401
    if (!req.body._id) {
        res.status(401).json({
            message: 'UnauthorizedError: private profile'
        });
    } else {
        // Otherwise continue
        User.findById(req.body._id).exec(function(err, user) {
            mongoose.set('useFindAndModify', false);
            User.findOneAndUpdate({ _id: req.body._id }, { productName: req.body.productID, productAmount: req.body.productAmount }).then(function() {
                User.findById({ _id: req.body._id }).then(function(result) {
                    console.log(result)
                })
            })
            res.status(200).json(user);
        });
    }
};