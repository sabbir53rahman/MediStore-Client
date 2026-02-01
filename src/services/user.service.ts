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

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      console.log(cookieStore);

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: "Session not found" };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: err };
    }
  },
  getAllUsers: async function (
    params?: GetUsersParams,
    options?: ServiceOptions,
  ) {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();

      const url = new URL(`${API_URL}/users`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieHeader,
        },
        cache: options?.cache,
        next: options?.revalidate
          ? { revalidate: options.revalidate }
          : undefined,
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch users" } };
    }
  },

  getUserById: async function (userId: string) {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch user" },
      };
    }
  },

  updateMyProfile: async function (
    userId: string,
    payload: { name?: string; image?: string },
    token: string,
  ) {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update profile" },
      };
    }
  },

  adminUpdateUserStatus: async function (
    userId: string,
    payload: { status: string },
    token: string,
  ) {
    try {
      const res = await fetch(`${API_URL}/users/admin/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update user status" },
      };
    }
  },

  deleteUser: async function (userId: string, token: string) {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to delete user" },
      };
    }
  },
};
