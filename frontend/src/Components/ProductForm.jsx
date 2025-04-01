import React, { useState } from "react";

function ProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

	const handleSubmit = (e) => {
		e.preventDefault();
		addProduct(product);
	}

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
				placeholder="Title"
      />
      <input
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
				placeholder="Price"
      />
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
				placeholder="Description"
      />
      <input
        type="text"
        name="image"
        value={product.image}
        onChange={handleChange}
				placeholder="Image"
      />
      <button >Submit</button>
    </form>
  );
}

export default ProductForm;
