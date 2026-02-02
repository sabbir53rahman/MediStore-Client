"use server";

import { categoryService } from "@/services/category.service";

// Fetch all categories
export async function getAllCategoriesAction() {
  const { data, error } = await categoryService.getAllCategories({
    cache: "no-store",
  });

  // Just return data and error directly
  return {
    data,
    error: error?.message ?? null,
  };
}

// Create a new category
export async function createCategoryAction(name: string) {
  if (!name || name.trim() === "") {
    return { data: null, error: "Category name is required" };
  }

  const { data, error } = await categoryService.createCategory({ name });

  // Return data and a readable error
  return {
    data,
    error: error?.message ?? null,
  };
}
