"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Edit, Save, X, DollarSign, ImageIcon, FileText } from "lucide-react"

interface Product {
  id: string
  title: string
  price: string
  description: string
  image: string
}

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: any) => Promise<void>
  product: Product | null
}

export default function EditModal({ isOpen, onClose, onSave, product }: EditModalProps) {
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState("")

  useEffect(() => {
    if (product) {
      setEditedProduct({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        image: product.image || "",
      })
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSave(editedProduct)
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full border border-gray-200 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Edit className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
              <p className="text-sm text-gray-500">Update your product information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Product Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleChange}
                onFocus={() => setFocusedField("title")}
                onBlur={() => setFocusedField("")}
                placeholder="Enter product title"
                required
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  focusedField === "title"
                    ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                    : "border-gray-300 hover:border-gray-400"
                } text-gray-900`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Price</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("price")}
                  onBlur={() => setFocusedField("")}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    focusedField === "price"
                      ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                  } text-gray-900`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <ImageIcon className="h-4 w-4" />
              <span>Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              value={editedProduct.image}
              onChange={handleChange}
              onFocus={() => setFocusedField("image")}
              onBlur={() => setFocusedField("")}
              placeholder="https://example.com/image.jpg"
              required
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                focusedField === "image"
                  ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              } text-gray-900`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              onFocus={() => setFocusedField("description")}
              onBlur={() => setFocusedField("")}
              placeholder="Enter product description"
              required
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                focusedField === "description"
                  ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              } text-gray-900 resize-none`}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-3" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
