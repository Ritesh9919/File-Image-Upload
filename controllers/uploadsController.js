const {StatusCodes} = require('http-status-codes');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const cloudinary = require('cloudinary').v2;


module.exports.uploadProductImageLocal = async (req, res) => {
    if(!req.files) {
        throw new Error('No file uploaded');
    }
    let productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')) {
        throw new Error('please upload image');
    }

    const imagePath = path.join(__dirname, '../images/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);

    return res.status(StatusCodes.OK).json({
        image:{
            src:`/uploads/${productImage.name}`
        }
    });
}



module.exports.uploadProductImageCloudinary = async (req, res) =>{
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename:true,
    folder:'file-uploads'
  })
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({image:{src:result.secure_url}});
}