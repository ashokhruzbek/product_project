"use client"

import { X, Heart, Edit, Star, Zap, Shield, Truck } from "lucide-react"

interface Product {
  id: string
  title: string
  price: string
  description: string
  image: string
}

interface QuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  isFavorite: boolean
  onToggleFavorite: () => void
  onEdit: () => void
}

export default function QuickViewModal({
  isOpen,
  onClose,
  product,
  isFavorite,
  onToggleFavorite,
  onEdit,
}: QuickViewModalProps) {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        <div className="flex">
          {/* Image Section */}
          <div className="flex-1 relative">
            <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {isFavorite && (
              <div className="absolute top-4 left-4">
                <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h2>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-blue-600">${product.price}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Shield className="h-3 w-3" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  <Truck className="h-3 w-3" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  <Zap className="h-3 w-3" />
                  <span>Popular</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onToggleFavorite}
                  className={`w-full py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Heart className={`h-5 w-5 inline mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <button
                  onClick={onEdit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Edit className="h-5 w-5 inline mr-2" />
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
