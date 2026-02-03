"use client";

import ProductCard from "@/components/layout/product-card";
import { Search, Loader2, XCircle, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { Category, Medicine } from "@/types/api.type";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";

interface ShopPageProps {
  medicines: Medicine[];
  categories: Category[];
  activeCategoryId: string;
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  onFilterUpdate: (filters: Record<string, string>) => void;
  isLoading: boolean;
}

const ShopPage: React.FC<ShopPageProps> = ({
  medicines,
  categories,
  activeCategoryId,
  minPrice,
  maxPrice,
  searchTerm,
  onFilterUpdate,
  isLoading,
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
    setLocalSearch(searchTerm);
  }, [minPrice, maxPrice, searchTerm]);

  const handleApplyFilters = () => {
    onFilterUpdate({
      minPrice: localMin,
      maxPrice: localMax,
      search: localSearch,
    });
  };

  const handleReset = () => {
    setLocalSearch("");
    setLocalMin("");
    setLocalMax("");
    onFilterUpdate({
      categoryId: "All",
      minPrice: "",
      maxPrice: "",
      search: "",
    });
  };

  const handleAddToCart = async (medicine: Medicine) => {
    try {
      setAddingToCartId(medicine.id);
      const res: any = await cartService.addToCart({
        medicineId: medicine.id,
        quantity: 1,
      });
      if (res.data?.success === false) throw new Error();
      toast.success(`${medicine.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCartId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      <aside className="w-full md:w-72 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-slate-800">Categories</h3>
            {(activeCategoryId !== "All" ||
              minPrice ||
              maxPrice ||
              searchTerm) && (
              <button
                onClick={handleReset}
                className="text-xs text-red-500 hover:underline flex items-center gap-1"
              >
                <XCircle className="w-3 h-3" /> Clear All
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => onFilterUpdate({ categoryId: "All" })}
              className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                activeCategoryId === "All"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              All Medicines
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilterUpdate({ categoryId: cat.id })}
                className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                  activeCategoryId === cat.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <Filter className="w-4 h-4" />
            <h3 className="font-bold text-xl">Price Range</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
              />
              <span className="text-slate-400">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
              />
            </div>
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Apply Price Filter"
              )}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow space-y-8">
        <div className="relative group max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search medicine..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-slate-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl">
            <p className="text-slate-500">No medicines match these filters.</p>
            <button
              onClick={handleReset}
              className="text-emerald-600 font-bold mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <ProductCard
                key={med.id}
                medicine={med}
                addToCart={handleAddToCart}
                loading={addingToCartId === med.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
