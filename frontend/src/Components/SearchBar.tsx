"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          placeholder="Mahsulot qidirmoqchimisan?..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600">
          Searching for: <span className="font-medium text-blue-600">"{searchTerm}"</span>
        </div>
      )}
    </div>
  )
}
