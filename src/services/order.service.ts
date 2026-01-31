import { env } from "@/env";

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

export const orderService = {
  createOrder: async function (payload: CreateOrderPayload, token: string) {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to create order" },
      };
    }
  },

  getMyOrders: async function (token: string, options?: ServiceOptions) {
    try {
      const config: RequestInit = {};

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(`${API_URL}/orders/my-orders`, config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch orders" },
      };
    }
  },

  getOrderById: async function (
    orderId: string,
    token: string,
    options?: ServiceOptions,
  ) {
    try {
      const config: RequestInit = {};

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(`${API_URL}/orders/${orderId}`, config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch order" },
      };
    }
  },

  getSellerOrders: async function (token: string, options?: ServiceOptions) {
    try {
      const config: RequestInit = {};

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(`${API_URL}/orders/seller-orders`, config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch seller orders" },
      };
    }
  },

  updateOrderStatus: async function (
    orderId: string,
    status: string,
    token: string,
  ) {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",

        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update order status" },
      };
    }
  },
};
