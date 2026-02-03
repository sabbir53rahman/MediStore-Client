import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

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

export const reviewService = {
  createReview: async (
    medicineId: string,
    payload: { rating: number; comment?: string },
  ) => {
    return apiFetch(`/reviews/${medicineId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getReviewsByMedicine: async (medicineId: string) => {
    return apiFetch(`/reviews/medicine/${medicineId}`, {
      method: "GET",
    });
  },

  updateReview: async (
    reviewId: string,
    payload: { rating?: number; comment?: string },
  ) => {
    return apiFetch(`/reviews/update/${reviewId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteReview: async (reviewId: string) => {
    return apiFetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    });
  },
};
