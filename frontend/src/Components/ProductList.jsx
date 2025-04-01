import React, { useState } from "react";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  return (
    <div className="product_list">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductList;
