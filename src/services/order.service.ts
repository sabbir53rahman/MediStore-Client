import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface GetAllOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateOrderPayload {
  address: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
}

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  SHIPPED = "SHIPPED",
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

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    return apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getAllOrders: async (
    params?: GetAllOrdersParams,
    options?: ServiceOptions,
  ) => {
    const query = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== null && value !== "") {
                acc[key] = String(value);
              }
              return acc;
            },
            {} as Record<string, string>,
          ),
        ).toString()
      : "";

    return apiFetch(`/orders${query}`, {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  getMyOrders: async (options?: ServiceOptions) => {
    return apiFetch("/orders/my-orders", {
      method: "GET",
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  getOrderById: async (orderId: string, options?: ServiceOptions) => {
    return apiFetch(`/orders/${orderId}`, {
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  getSellerOrders: async (options?: ServiceOptions) => {
    return apiFetch("/orders/seller/all", {
      cache: options?.cache,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    return apiFetch(`/orders/seller/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
