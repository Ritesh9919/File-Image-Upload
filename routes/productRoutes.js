const e = require('express');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const imageUploadController = require('../controllers/uploadsController');

router.post('/api/v1/products', productController.createProduct);
router.get('/api/v1/products', productController.getAllProducts);
router.post('/api/v1/upload', imageUploadController.uploadProductImageCloudinary);
module.exports = router;