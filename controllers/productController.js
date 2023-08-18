const Product = require('../models/product');
const {StatusCodes} = require('http-status-codes');


module.exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    return res.status(StatusCodes.CREATED).json({
        product:product
    })
}


module.exports.getAllProducts = async(req, res) => {
    const product = await Product.find({});
    return res.status(StatusCodes.OK).json({product:product});
}
