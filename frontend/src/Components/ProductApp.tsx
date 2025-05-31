"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import QuickViewModal from "./QuickViewModal";

// Product interfeysi
interface Product {
  id: number | string;
  title?: string;
  description?: string;
  [key: string]: any; // boshqa maydonlar uchun (agar bo'lsa)
}

interface DeleteModalState {
  isOpen: boolean;
  product: Product | null;
}

interface EditModalState {
  isOpen: boolean;
  product: Product | null;
}

interface QuickViewModalState {
  isOpen: boolean;
  product: Product | null;
}

export default function ProductApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    product: null,
  });
  const [editModal, setEditModal] = useState<EditModalState>({
    isOpen: false,
    product: null,
  });
  const [quickViewModal, setQuickViewModal] = useState<QuickViewModalState>({
    isOpen: false,
    product: null,
  });
  const [favorites, setFavorites] = useState<Set<number | string>>(new Set());

  // Fetch products from API
  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>("http://51.21.3.241/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
      toast.success("Products loaded successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Add new product
  const addProduct = async (newProduct: Partial<Product>): Promise<void> => {
    try {
      const response = await axios.post<Product>(
        "http://51.21.3.241/api/products",
        newProduct
      );
      setProducts((prev) => [response.data, ...prev]);
      toast.success("🎉 Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("❌ Failed to add product", {
        position: "top-right",
        autoClose: 3000,
      });
      throw error;
    }
  };

  // Update product
  const updateProduct = async (updatedProduct: Partial<Product>): Promise<void> => {
    try {
      const productId = editModal.product?.id;
      if (!productId) throw new Error("Invalid product ID");

      const response = await axios.put<Product>(
        `http://51.21.3.241/api/products/${productId}`,
        updatedProduct
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? response.data : product
        )
      );
      toast.success("✅ Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("❌ Failed to update product", {
        position: "top-right",
        autoClose: 3000,
      });
      throw error;
    }
  };

  // Delete product
  const deleteProduct = async (productId: number | string): Promise<void> => {
    try {
      await axios.delete(`http://51.21.3.241/api/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(productId);
        return newFavorites;
      });
      toast.success("🗑️ Product deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("❌ Failed to delete product", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteClick = (product: Product): void =>
    setDeleteModal({ isOpen: true, product });
  const handleEditClick = (product: Product): void =>
    setEditModal({ isOpen: true, product });
  const handleQuickViewClick = (product: Product): void =>
    setQuickViewModal({ isOpen: true, product });

  const handleDeleteConfirm = (): void => {
    if (deleteModal.product?.id) {
      deleteProduct(deleteModal.product.id);
    }
    setDeleteModal({ isOpen: false, product: null });
  };

  const toggleFavorite = (productId: number | string): void => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        toast.info("💔 Removed from favorites", { autoClose: 2000 });
      } else {
        newFavorites.add(productId);
        toast.success("❤️ Added to favorites", { autoClose: 2000 });
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header
        productCount={filteredProducts.length}
        totalProducts={products.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="animate-fade-in-down">
          <ProductForm addProduct={addProduct} />
        </div>

        <div className="animate-fade-in-up animation-delay-200">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="animate-fade-in-up animation-delay-400">
            <ProductList
              products={filteredProducts}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
              onQuickViewClick={handleQuickViewClick}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        )}
      </main>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={handleDeleteConfirm}
        productTitle={deleteModal.product?.title || ""}
      />

      <EditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, product: null })}
        onSave={updateProduct}
        product={editModal.product}
      />

      <QuickViewModal
        isOpen={quickViewModal.isOpen}
        onClose={() => setQuickViewModal({ isOpen: false, product: null })}
        product={quickViewModal.product}
        isFavorite={
          quickViewModal.product
            ? favorites.has(quickViewModal.product.id)
            : false
        }
        onToggleFavorite={() =>
          quickViewModal.product && toggleFavorite(quickViewModal.product.id)
        }
        onEdit={() => {
          setQuickViewModal({ isOpen: false, product: null });
          setEditModal({ isOpen: true, product: quickViewModal.product });
        }}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  );
}
