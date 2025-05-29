import { Package, Heart } from "lucide-react"
import ProductItem from "./ProductItem"

interface Product {
  id: string
  title: string
  price: string
  description: string
  image: string
}

interface ProductListProps {
  products: Product[]
  onDeleteClick: (product: Product) => void
  onEditClick: (product: Product) => void
  onQuickViewClick: (product: Product) => void
  favorites: Set<string>
  onToggleFavorite: (productId: string) => void
}

export default function ProductList({
  products,
  onDeleteClick,
  onEditClick,
  onQuickViewClick,
  favorites,
  onToggleFavorite,
}: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-lg inline-block hover:shadow-xl transition-all duration-500 transform hover:scale-105">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-inner">
            <Package className="h-16 w-16 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h3>
          <p className="text-gray-500 mb-6">Start by adding your first amazing product!</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
            <Heart className="h-4 w-4" />
            <span>We're excited to see what you create</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
          Our Products
        </h2>
        <p className="text-gray-600 text-lg">Discover amazing products at great prices</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id ?? index}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: "both",
            }}
          >
            <ProductItem
              product={product}
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              onQuickViewClick={onQuickViewClick}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
