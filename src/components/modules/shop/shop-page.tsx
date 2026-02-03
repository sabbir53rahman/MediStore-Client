"use client";

import ProductCard from "@/components/layout/product-card";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Category, Medicine } from "@/types/api.type";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";
import { getAllMedicinesAction } from "@/actions/medicine.actions";

interface ShopPageProps {
  medicines: Medicine[];
  categories: Category[];
  categoryId: string;
  token?: string;
}

const ShopPage: React.FC<ShopPageProps> = ({
  medicines,
  categories,
  categoryId,
  token,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState(categoryId);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [medicinesList, setMedicines] = useState<Medicine[]>(medicines || []);

  // Price filter state
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    setCurrentCategory(categoryId);
    setMedicines(medicines || []);
  }, [categoryId, medicines]);

  // Filtered by search term safely
  const filtered = Array.isArray(medicinesList)
    ? medicinesList.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (m.sellerId &&
            m.sellerId.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : [];

  // Handle category click
  const handleCategoryClick = (catId: string | "All") => {
    const params = new URLSearchParams(searchParams.toString());
    if (catId === "All") params.delete("categoryId");
    else params.set("categoryId", catId);

    setCurrentCategory(catId);
    router.push(`/shop?${params.toString()}`);
  };

  // Handle add to cart
  const handleAddToCart = async (medicine: Medicine) => {
    try {
      setLoadingId(medicine.id);

      const res: any = await cartService.addToCart({
        medicineId: medicine.id,
        quantity: 1,
      });

      setLoadingId(null);
      if (res.data?.success === false) {
        toast(res.data.message);
        return;
      }

      if (res.error) {
        toast(res.error.message || "Failed to add item to cart");
        return;
      } else {
        toast.success("Added to cart successfully");
      }
    } catch (err) {
      setLoadingId(null);
      console.error("Add to cart error:", err);
      toast("Failed to add item to cart");
    }
  };

  // Apply price filter
  const applyPriceFilter = async () => {
    try {
      const params: any = {
        categoryId: currentCategory !== "All" ? currentCategory : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        search: searchTerm || undefined,
      };

      const { data, error }: any = await getAllMedicinesAction(params);

      if (error) {
        toast.error(error);
        return;
      }

      setMedicines(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Price filter error:", err);
      toast("Failed to filter by price");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-6">
        <h3 className="font-bold text-lg">Categories</h3>
        <button
          onClick={() => handleCategoryClick("All")}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            currentCategory === "All"
              ? "bg-emerald-600 text-white"
              : "hover:bg-slate-100"
          }`}
        >
          All Medicines
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              currentCategory === cat.id
                ? "bg-emerald-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {cat.name}
          </button>
        ))}

        {/* Price Filter */}
        <div className="space-y-2 mt-6">
          <h3 className="font-bold text-lg">Filter by Price</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 px-2 py-1 border rounded"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : "")
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 px-2 py-1 border rounded"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : "")
              }
            />
          </div>
          <button
            onClick={applyPriceFilter}
            className="mt-2 w-full bg-emerald-600 text-white py-1 rounded-lg"
          >
            Apply
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow space-y-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No medicines found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((med) => (
              <ProductCard
                key={med.id}
                medicine={med}
                addToCart={handleAddToCart}
                loading={loadingId === med.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
