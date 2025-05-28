import React, { useEffect, useState } from "react";
import { ShoppingBag, Plus, Package, Star, DollarSign } from "lucide-react";

// ProductApp Component
function ProductApp() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const yangiQoshilganMahsulot = await response.json();
      setProducts(prevProducts => [yangiQoshilganMahsulot, ...prevProducts]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProductHub
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Package className="h-4 w-4" />
              <span>{products.length} Products</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm addProduct={addProduct} />
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white/50 rounded-2xl p-12 backdrop-blur-sm border border-blue-100">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-600 text-center">Loading Products...</h3>
            </div>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
}

// ProductForm Component
function ProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addProduct(product);
    setProduct({
      title: "",
      price: "",
      description: "",
      image: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="mb-12">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 transform hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Enter product title..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description..."
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ProductItem Component
function ProductItem({ product, index }) {
  return (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 overflow-hidden transform hover:scale-[1.03] transition-all duration-500 group"
      style={{
        animationDelay: `${index * 150}ms`
      }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Star className="h-4 w-4 text-yellow-500" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.title}
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${product.price}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed" title={product.description}>
          {product.description.length > 120
            ? product.description.slice(0, 120) + "..."
            : product.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ProductList Component
function ProductList({ products }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h2>
        <p className="text-gray-600">Discover amazing products at great prices</p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/50 rounded-2xl p-12 backdrop-blur-sm border border-blue-100">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Yet</h3>
            <p className="text-gray-500">Add your first product using the form above!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductItem key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductApp;