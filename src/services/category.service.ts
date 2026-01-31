import { env } from "@/env";

const API_URL = env.API_URL;

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const categoryService = {
  getAllCategories: async function (options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/categories`);

      const config: RequestInit = {};
      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch categories" } };
    }
  },

  createCategory: async function (payload: { name: string }) {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to create category" } };
    }
  },
};
