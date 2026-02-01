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
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch cart" } };
    }
  },

  addToCart: async function (payload: AddToCartPayload) {
    try {
      const res = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to add item to cart" } };
    }
  },

  updateQuantity: async function (
    itemId: string,
    payload: UpdateQuantityPayload,
  ) {
    try {
      const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to update cart item quantity" },
      };
    }
  },

  removeFromCart: async function (itemId: string) {
    try {
      const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to remove item from cart" },
      };
    }
  },
};
