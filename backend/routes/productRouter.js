const express = require("express");
const {getProduct, delProduct, editProduct, addProduct } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post('/', addProduct);
productRouter.get('/',getProduct);
productRouter.delete('/:id', delProduct);
productRouter.put('/:id',editProduct)


module.exports = productRouter