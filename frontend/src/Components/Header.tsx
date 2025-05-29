import { ShoppingBag, Package, Sparkles } from "lucide-react"

interface HeaderProps {
  productCount: number
  totalProducts: number
}

export default function Header({ productCount, totalProducts }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ProductHub
              </h1>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Sparkles className="h-3 w-3" />
                <span>Modern & Interactive</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full shadow-sm border border-blue-100">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="font-medium">
                {productCount === totalProducts ? `${totalProducts} Products` : `${productCount} of ${totalProducts}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
