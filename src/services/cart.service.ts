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

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ data: T | null; error: { message: string } | null }> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include", 
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Something went wrong");
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: { message: err.message || "Something went wrong" },
    };
  }
}

export const cartService = {
  getMyCart: async (options?: ServiceOptions) =>
    apiFetch("/cart", { method: "GET" }),

  addToCart: async (payload: AddToCartPayload) =>
    apiFetch("/cart/items", { method: "POST", body: JSON.stringify(payload) }),

  updateQuantity: async (itemId: string, payload: UpdateQuantityPayload) =>
    apiFetch(`/cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  removeFromCart: async (itemId: string) =>
    apiFetch(`/cart/items/${itemId}`, { method: "DELETE" }),
};
