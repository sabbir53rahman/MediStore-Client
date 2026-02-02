"use server";

import {
  orderService,
  CreateOrderPayload,
  OrderStatus,
  GetAllOrdersParams,
} from "@/services/order.service";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export async function createOrderAction(payload: CreateOrderPayload) {
  const { data, error } = await orderService.createOrder(payload);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function getMyOrdersAction(options?: ServiceOptions) {
  const { data, error } = await orderService.getMyOrders(options);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getAllOrdersAction(
  params?: GetAllOrdersParams,
  options?: ServiceOptions,
) {
  const { data, error } = await orderService.getAllOrders(params, options);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getOrderByIdAction(
  orderId: string,
  options?: ServiceOptions,
) {
  const { data, error } = await orderService.getOrderById(orderId, options);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function getSellerOrdersAction(options?: ServiceOptions) {
  const { data, error } = await orderService.getSellerOrders(options);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
) {
  const { data, error } = await orderService.updateOrderStatus(orderId, status);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}
