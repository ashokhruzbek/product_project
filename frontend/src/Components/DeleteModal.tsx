"use client"

import { AlertTriangle, Trash2 } from "lucide-react"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productTitle: string
}

export default function DeleteModal({ isOpen, onClose, onConfirm, productTitle }: DeleteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-gray-200 shadow-2xl animate-scale-in">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product</h3>
          <p className="text-gray-600 mb-8">
            Are you sure you want to delete <span className="font-semibold text-red-600">"{productTitle}"</span>? This
            action cannot be undone and will permanently remove the product.
          </p>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Trash2 className="h-4 w-4 inline mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
