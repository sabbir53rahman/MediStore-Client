"use client";

import React, { useEffect, useState } from "react";
import {
  getAllCategoriesAction,
  createCategoryAction,
} from "@/actions/category.actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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
    const { data, error } = await getAllCategoriesAction();
    if (error) {
      toast.error(error);
    } else {
      setCategories(data?.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Manage Categories
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />
        <button
          onClick={handleAddCategory}
          disabled={submitting}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {submitting ? "Adding..." : "Add Category"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No categories found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="border border-gray-200 rounded-lg p-5 shadow hover:shadow-lg transition bg-white flex items-center justify-between"
            >
              <h2 className="font-semibold text-lg text-gray-800">
                {cat.name}
              </h2>
              <Badge className="bg-blue-100 text-blue-800">{cat.name}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
