"use client";

import React, { useEffect, useState } from "react";
import {
  getAllCategoriesAction,
  createCategoryAction,
} from "@/actions/category.actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Tag,
  Loader2,
  LayoutGrid,
  Search,
  FolderPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Category = {
  id: string;
  name: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error }: any = await getAllCategoriesAction();
      if (error) {
        toast.error(error);
      } else {
        setCategories(data?.data || []);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitting(true);
    const { data, error } = await createCategoryAction(newCategory.trim());

    if (error) {
      toast.error(error);
    } else if (data) {
      toast.success("Category added successfully!");
      setNewCategory("");
      await fetchCategories();
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-blue-600" />
              Manage Categories
            </h1>
            <p className="text-slate-500 mt-1">
              Create and organize medicine categories for your shop.
            </p>
          </div>
          <Badge
            variant="outline"
            className="w-fit bg-white px-4 py-1 text-sm font-medium border-slate-200 shadow-sm"
          >
            Total: {categories.length}
          </Badge>
        </div>

        {/* Input Card */}
        <Card className="mb-10 border-none shadow-md overflow-hidden bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  placeholder="e.g. Antibiotics, Pain Relief..."
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500 rounded-xl"
                  disabled={submitting}
                />
              </div>
              <Button
                onClick={handleAddCategory}
                disabled={submitting}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-200 gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Add Category
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-24 bg-white border border-slate-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderPlus className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              No categories yet
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              Start by adding your first medicine category using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                    Category ID: {cat.id.slice(0, 8)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
