const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    iconPath: {
        type: String
    },
    price: {
        type: Number
    },
    ID: {
        type: String
    },
    name: {
        type: String
    }
});

const Product = mongoose.model('product', productSchema);


/**
 * Fills the database with products. Since this page only has a single product 
 * there is no need to include a for loop or anything else. Should there be a need to include more than one product on 
 * the site, then add a json file that has all the data for every product and loop through the file and add it to the database. 
 * 
 * Alternativly, fill the database beforehand with every product. In normal practice this would not be a problem, however in 
 * order for this project to work on any entity aka, any computer, the products needs to be added beforehand. This is works since
 * there is only one product, but should the site contain thousands upon thousands of products, then the startup time would take some time.
 * 
 * However, as stated earlier this is not how you do it in practice, but it had to be implemented for this assignment. I would personally 
 * fill the database beforehand.
 */
module.exports.createProducts = (req, res) => {

    //So no duplicate documents can be added
    Product.countDocuments({
        ID: "2376UF"
    }, function(err, count) {
        if (count == 0) {
            const product = new Product();

            product.iconPath = "../../client/src/assets/productIcons/residentIcon.webp";
            product.price = 628;
            product.ID = "2376UF";
            product.name = "Resident Evil Village";

            product.save();
        }
    });
};