"use server";

import { orderService, CreateOrderPayload } from "@/services/order.service";
import { userService } from "@/services/user.service";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export async function createOrderAction(payload: CreateOrderPayload) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { success: false, error: "Unauthorized" };

  const { data, error } = await orderService.createOrder(payload, token);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function getMyOrdersAction(options?: ServiceOptions) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { data: null, error: "Unauthorized" };

  const { data, error } = await orderService.getMyOrders(token, options);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getOrderByIdAction(
  orderId: string,
  options?: ServiceOptions,
) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { data: null, error: "Unauthorized" };

  const { data, error } = await orderService.getOrderById(
    orderId,
    token,
    options,
  );

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getSellerOrdersAction(options?: ServiceOptions) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { data: null, error: "Unauthorized" };

  const { data, error } = await orderService.getSellerOrders(token, options);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  const { data: session } = await userService.getSession();
  const token = session?.session?.token;

  if (!token) return { success: false, error: "Unauthorized" };

  const { data, error } = await orderService.updateOrderStatus(
    orderId,
    status,
    token,
  );

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}
