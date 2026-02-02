import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateCategoryPayload {
  name: string;
}

const getCookieHeader = async () => {
  try {
    const cookieStore = await cookies();
    const cookieArray = cookieStore.getAll().map((c) => `${c.name}=${c.value}`);
    return cookieArray.join("; ");
  } catch (e) {
    return null;
  }
};

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{
  data: T | null;
  error: { message: string; status?: number } | null;
}> {
  try {
    const cookieHeader = await getCookieHeader();

    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
      headers: headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || res.statusText);
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Something went wrong",
        status: err.status,
      },
    };
  }
}

export const categoryService = {
  getAllCategories: async (options?: ServiceOptions) => {
    return apiFetch<Category[]>("/categories", {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  createCategory: async (payload: CreateCategoryPayload) => {
    return apiFetch<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
