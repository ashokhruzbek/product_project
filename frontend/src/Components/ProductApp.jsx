import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import ProductForm from "./ProductForm"

function ProductApp() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/products",
        newProduct
      );
      console.log(response.data);
      const yangiQoshilganMahsulot = response.data;
      setProducts(prevProducts => ([...prevProducts, yangiQoshilganMahsulot]))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductForm addProduct={addProduct} />
      <ProductList products={products} />
    </div>
  );
}

export default ProductApp;
