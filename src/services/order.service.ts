import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface CreateOrderPayload {
  address: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
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

    // Prepare headers
    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // If we have a cookieHeader (Server Side), attach it manually
    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      // credentials: "include" handles the browser/client side
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
