import { env } from "@/env";

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

export const medicineService = {
  createMedicine: async function (payload: any, token: string) {
    try {
      const res = await fetch(`${API_URL}/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to create medicine" },
      };
    }
  },

  getAllMedicines: async function (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines" },
      };
    }
  },

  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch medicine" },
      };
    }
  },

  getMedicinesByCategory: async function (
    categoryId: string,
    params?: Omit<GetMedicinesParams, "categoryId">,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(
        `${API_URL}/medicines/category-medicine/${categoryId}`,
      );

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch medicines by category" },
      };
    }
  },

  updateMedicine: async function (id: string, payload: any, token: string) {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update medicine" },
      };
    }
  },

  deleteMedicine: async function (id: string, token: string) {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to delete medicine" },
      };
    }
  },
};
