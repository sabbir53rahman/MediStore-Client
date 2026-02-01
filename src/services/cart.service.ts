const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface AddToCartPayload {
  medicineId: string;
  quantity?: number;
}

interface UpdateQuantityPayload {
  quantity: number;
}

export const cartService = {
  getMyCart: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        credentials: "include",
      };

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      const res = await fetch(`${API_URL}/cart`, config);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Failed to fetch cart" },
      };
    }
  },

  addToCart: async function (payload: AddToCartPayload) {
    try {
      const res = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add item to cart");
      const data = await res.json();

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Failed to add item to cart" },
      };
    }
  },

  updateQuantity: async function (
    itemId: string,
    payload: UpdateQuantityPayload,
  ) {
    try {
      const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update cart item quantity");
      const data = await res.json();

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: {
          message: err.message || "Failed to update cart item quantity",
        },
      };
    }
  },

  removeFromCart: async function (itemId: string) {
    try {
      const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item from cart");
      const data = await res.json();

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Failed to remove item from cart" },
      };
    }
  },
};
