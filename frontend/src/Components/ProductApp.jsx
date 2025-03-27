import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import axios from 'axios';

function ProductApp() {
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/products')
            setProducts(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div>
            <ProductForm />
            <ProductList products={products} />
        </div>
    )
}

export default ProductApp