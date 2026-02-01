import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export interface GetUsersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

// Helper to convert Next.js cookies() into a proper Cookie header
const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const cookieArray = cookieStore.getAll().map((c) => `${c.name}=${c.value}`);
  return cookieArray.join("; ");
};

export const userService = {
  // Fetch session from AUTH_URL using server-side cookies
  getSession: async function () {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      });

      const session = await res.json();

      if (!session) {
        return { data: null, error: "Session not found" };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: err };
    }
  },

  // Get all users with optional query params and server-side cookies
  getAllUsers: async function (
    params?: GetUsersParams,
    options?: ServiceOptions,
  ) {
    try {
      const cookieHeader = await getCookieHeader();

      const url = new URL(`${API_URL}/users`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: { Cookie: cookieHeader },
        cache: options?.cache,
        next: options?.revalidate
          ? { revalidate: options.revalidate }
          : undefined,
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Failed to fetch users", originalError: err },
      };
    }
  },

  getUserById: async function (userId: string) {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${API_URL}/users/${userId}`, {
        headers: { Cookie: cookieHeader },
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch user", originalError: err },
      };
    }
  },

  updateMyProfile: async function (
    userId: string,
    payload: { name?: string; image?: string },
  ) {
    try {
      const cookieHeader = await getCookieHeader();

      console.log("Cookie header:", cookieHeader);

      const res = await fetch(`${API_URL}/users/update-profile/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update profile", originalError: err },
      };
    }
  },

  adminUpdateUserStatus: async function (
    userId: string,
    payload: { status: string },
  ) {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${API_URL}/users/admin/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update user status", originalError: err },
      };
    }
  },

  deleteUser: async function (userId: string) {
    try {
      const cookieHeader = await getCookieHeader();

      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: { Cookie: cookieHeader },
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to delete user", originalError: err },
      };
    }
  },
};
