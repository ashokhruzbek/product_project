
import { useState } from "react"
import { Plus, DollarSign, ImageIcon, FileText, Sparkles } from "lucide-react"

interface ProductFormProps {
  addProduct: (product: any) => Promise<void>
}

export default function ProductForm({ addProduct }: ProductFormProps) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [focusedField, setFocusedField] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addProduct(product)
      setProduct({ title: "", price: "", description: "", image: "" })
      setIsExpanded(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-500">
        <div
          className="flex items-center justify-between p-6 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg transition-all duration-300 ${isExpanded ? "scale-110 rotate-45" : "hover:scale-105"}`}
            >
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <Sparkles className="h-3 w-3" />
                <span>Create something amazing</span>
              </p>
            </div>
          </div>
          <div
            className={`transform transition-all duration-300 ${isExpanded ? "rotate-45 scale-110" : "hover:scale-110"}`}
          >
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
        </div>

        {isExpanded && (
          <div className="animate-slide-down">
            <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6 border-t border-gray-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Product Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Enter product title"
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      focusedField === "title"
                        ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } text-gray-900 bg-white/50 backdrop-blur-sm`}
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
                      value={product.price}
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
                      } text-gray-900 bg-white/50 backdrop-blur-sm`}
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
                  value={product.image}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("image")}
                  onBlur={() => setFocusedField("")}
                  placeholder="https://example.com/image.jpg"
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                    focusedField === "image"
                      ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                  } text-gray-900 bg-white/50 backdrop-blur-sm`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={product.description}
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
                  } text-gray-900 bg-white/50 backdrop-blur-sm resize-none`}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-3" />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
