import { Package, Sparkles } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-lg">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Mahsulotlar yuklanmoqda...</h3>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>Qidirish uchun qulay va qulay ishlaydi</span>
        </div>

        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
