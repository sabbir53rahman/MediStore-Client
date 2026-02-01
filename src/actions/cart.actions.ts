"use server";

import { cartService } from "@/services/cart.service";

export async function getMyCartAction() {
  const { data, error } = await cartService.getMyCart();
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function addToCartAction(
  medicineId: string,
  quantity: number = 1,
) {
  const { error } = await cartService.addToCart({ medicineId, quantity });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateCartQuantityAction(
  itemId: string,
  quantity: number,
) {
  const { error } = await cartService.updateQuantity(itemId, { quantity });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function removeFromCartAction(itemId: string) {
  const { error } = await cartService.removeFromCart(itemId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
