"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getMyCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/actions/cart.actions";
import { cartService } from "@/services/cart.service";

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch cart only once (or on route change)
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

  // 🔹 Update quantity
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const res = await updateCartQuantityAction(itemId, newQuantity);

    if (res.success) {
      setCart((prev: any) => ({
        ...prev,
        items: prev.items.map((item: any) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      }));
    } else {
      alert(res.error || "Failed to update quantity");
    }
  };

  // 🔹 Remove item
  const handleRemoveItem = async (itemId: string) => {
    const res = await removeFromCartAction(itemId);

    if (res.success) {
      setCart((prev: any) => ({
        ...prev,
        items: prev.items.filter((item: any) => item.id !== itemId),
      }));
    } else {
      alert(res.error || "Failed to remove item");
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
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>

              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>

              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
