"use client"

import { useState } from "react"
import { Star, Edit, Trash2, Eye, Heart, Zap } from "lucide-react"

interface Product {
  id: string
  title: string
  price: string
  description: string
  image: string
}

interface ProductItemProps {
  product: Product
  onDeleteClick: (product: Product) => void
  onEditClick: (product: Product) => void
  onQuickViewClick: (product: Product) => void
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function ProductItem({
  product,
  onDeleteClick,
  onEditClick,
  onQuickViewClick,
  isFavorite,
  onToggleFavorite,
}: ProductItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleImageLoad = () => setImageLoaded(true)
  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500 hover:border-blue-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 w-full h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {imageError ? (
          <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title || "Product Image"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-64 object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        )}

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Action Buttons */}
        <div
          className={`absolute top-4 right-4 space-y-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
              isFavorite ? "bg-red-500 text-white" : "bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500"
            }`}
            aria-label="Toggle Favorite"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickViewClick(product)
            }}
            className="bg-blue-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Quick View"
          >
            <Eye className="h-4 w-4 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onEditClick(product)
            }}
            className="bg-green-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Edit Product"
          >
            <Edit className="h-4 w-4 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDeleteClick(product)
            }}
            className="bg-red-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Delete Product"
          >
            <Trash2 className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Price Badge */}
        <div
          className={`absolute bottom-4 left-4 transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm">
            ${product.price}
          </div>
        </div>

        {/* Favorite Badge */}
        {isFavorite && (
          <div className="absolute top-4 left-4">
            <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
              <Heart className="h-4 w-4 fill-current" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3
          className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2"
          title={product.title}
        >
          {product.title || "No Title"}
        </h3>

        <div className="flex items-center my-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors duration-200 ${
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.0)</span>
          <div className="ml-auto flex items-center space-x-1 text-xs text-blue-600">
            <Zap className="h-3 w-3" />
            <span>Popular</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed" title={product.description}>
          {product.description?.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description || "No description"}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => onQuickViewClick(product)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  )
}
