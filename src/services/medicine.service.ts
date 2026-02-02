import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface GetMedicinesParams {
  search?: string;
  categoryId?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const getCookieHeader = async () => {
  try {
    const cookieStore = await cookies();
    return cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  } catch {
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
      headers,
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

function buildQuery(params?: Record<string, any>) {
  if (!params) return "";

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return query.toString() ? `?${query.toString()}` : "";
}

export const medicineService = {
  createMedicine: async (payload: any) => {
    return apiFetch("/medicines", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getAllMedicines: async (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) => {
    const query = buildQuery(params);

    return apiFetch(`/medicines${query}`, {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  getMedicineById: async (id: string, options?: ServiceOptions) => {
    return apiFetch(`/medicines/${id}`, {
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  getMedicinesByCategory: async (
    categoryId: string,
    params?: Omit<GetMedicinesParams, "categoryId">,
    options?: ServiceOptions,
  ) => {
    const query = buildQuery(params);

    return apiFetch(`/medicines/category-medicine/${categoryId}${query}`, {
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  updateMedicine: async (id: string, payload: any) => {
    return apiFetch(`/medicines/seller/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteMedicine: async (id: string) => {
    return apiFetch(`/medicines/${id}`, {
      method: "DELETE",
    });
  },
};
