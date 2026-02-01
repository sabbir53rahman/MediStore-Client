"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMyCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/actions/cart.actions";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      const { data, error } = await cartService.getMyCart();
      console.log("show cart data", data);

      if (error) {
        router.push("/auth/login");
        return;
      }

      setCart(data?.data || null);
      setLoading(false);
    };

    fetchCart();
  }, [router]);

  // 🔹 Loading state
  if (loading) return <p className="p-4">Loading...</p>;

  // 🔹 Empty cart state
  if (!cart || !cart.items || cart.items.length === 0) {
    return <p className="p-4">Your cart is empty.</p>;
  }

  const handleUpdateQuantity = async (
    cartItemId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    const res = await updateCartQuantityAction(cartItemId, newQuantity);

    console.log("updateQuentity", res);

    if (!res?.success) {
      toast(res?.error || "Failed to update quantity");
      return;
    }

    setCart((prev: any) => ({
      ...prev,
      items: prev.items.map((item: any) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item,
      ),
    }));
  };

  const handleRemoveItem = async (cartItemId: string) => {
    const res = await removeFromCartAction(cartItemId);

    if (!res?.success) {
      toast(res?.error || "Failed to remove item");
      return;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <p className="font-medium">{item.medicine.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>

              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>

              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
