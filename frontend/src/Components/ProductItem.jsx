import React from "react";

function ProductItem({ product }){
 
  return (
    <div className="card">
      <img src={product.image} alt="Telefon rasmi" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{product.title}</h2>
        <p className="card-price">${product.price}</p>
        <p className="card-description" title={product.description}>
          {product.description.length > 100
            ? product.description.slice(0, 110) + "..."
            : product.description}
        </p>
        <button className="delete-button" >O'chirish</button>
      </div>
    </div>
  );
}

export default ProductItem;
