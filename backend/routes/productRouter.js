const express = require("express");
const { product, getProduct, delProduct, editProduct } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post('/', product);
productRouter.get('/',getProduct);
productRouter.delete('/:id', delProduct);
productRouter.put('/:id',editProduct)


module.exports = productRouter