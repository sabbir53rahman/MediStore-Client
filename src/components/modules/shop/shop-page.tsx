"use client";

import ProductCard from "@/components/layout/product-card";
import { Search } from "lucide-react";
import { useState } from "react";
import { Category, Medicine } from "@/types/api.type";

interface ShopPageProps {
  medicines: Medicine[];
  categories: Category[];
}

const ShopPage: React.FC<ShopPageProps> = ({ medicines, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "All">(
    "All",
  );

  // Filtered medicines
  const filtered = medicines.filter(
    (m) =>
      (selectedCategory === "All" || m.category.name === selectedCategory) &&
      (m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.sellerId &&
          m.sellerId.toLowerCase().includes(searchTerm.toLowerCase()))),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === "All" ? "bg-emerald-600 text-white" : "hover:bg-slate-100 text-slate-600"}`}
            >
              All Medicines
            </button>
            {/* Map categories from medicines */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategoryId === cat.id
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 mb-2">Need Help?</h4>
          <p className="text-xs text-emerald-700 leading-relaxed mb-4">
            Talk to our certified pharmacists if you're not sure which medicine
            to pick.
          </p>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-xs font-bold">
            Chat with Expert
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow space-y-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by medicine name, brand..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-sm text-slate-500">
            Showing <b>{filtered.length}</b> products
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((med) => (
              <ProductCard key={med.id} medicine={med} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-3xl border border-dashed text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No medicines found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
