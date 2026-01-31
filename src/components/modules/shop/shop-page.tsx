"use client";

import ProductCard from "@/components/layout/product-card";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Category, Medicine } from "@/types/api.type";

interface ShopPageProps {
  medicines: Medicine[];
  categories: Category[];
  categoryId: string;
}

const ShopPage: React.FC<ShopPageProps> = ({
  medicines,
  categories,
  categoryId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState(categoryId);

  // Update state if prop changes
  useEffect(() => {
    setCurrentCategory(categoryId);
  }, [categoryId]);

  // Client-side search filter
  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.sellerId &&
        m.sellerId.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleCategoryClick = (categoryId: string | "All") => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === "All") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    setCurrentCategory(categoryId);
    router.push(`/shop?${params.toString()}`);
    router.refresh();
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((med) => (
            <ProductCard key={med.id} medicine={med} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
