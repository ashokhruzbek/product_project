"use client"

import { useState } from "react"
import { Plus, ImageIcon, DollarSign, FileText, Tag } from "lucide-react"

function ProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addProduct(product)
      setProduct({
        title: "",
        price: "",
        description: "",
        image: "",
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Tag className="h-4 w-4 mr-2 text-gray-500" />
            Product Title
          </label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="0.00"
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
      </div>

      {/* Image URL Input */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
        />
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4 mr-2 text-gray-500" />
          Description
        </label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding Product...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
