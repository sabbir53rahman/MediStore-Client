"use server";

import { categoryService } from "@/services/category.service";

export async function getAllCategoriesAction() {
  const { data, error } = await categoryService.getAllCategories({
    cache: "no-store",
  });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createCategoryAction(name: string) {
  if (!name || name.trim() === "") {
    return { data: null, error: "Category name is required" };
  }

  const { data, error } = await categoryService.createCategory({ name });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
