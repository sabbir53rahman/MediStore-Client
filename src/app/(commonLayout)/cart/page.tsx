"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateCartQuantityAction,
  removeFromCartAction,
} from "@/actions/cart.actions";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/order.actions";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const { data, error }: any = await cartService.getMyCart();

      if (error) {
        router.push("/auth/login");
        return;
      }

      setCart(data?.data || null);
      setLoading(false);
    };

    fetchCart();
  }, [router]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return <p className="p-4 text-center">Your cart is empty.</p>;
  }

  const handleUpdateQuantity = async (
    cartItemId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    const res = await updateCartQuantityAction(cartItemId, newQuantity);

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

    setCart((prev: any) => ({
      ...prev,
      items: prev.items.filter((item: any) => item.id !== cartItemId),
    }));
    toast.success("Item removed from cart");
  };

  const handleCreateOrder = async () => {
    if (!cart || !cart.items || cart.items.length === 0) return;
    setOrdering(true);

    const payload = {
      address: "Your default address",
      items: cart.items.map((item: any) => ({
        medicineId: item.medicine.id,
        quantity: item.quantity,
      })),
    };

    const res = await createOrderAction(payload);

    if (!res.success) {
      toast.error(res.error || "Failed to create order");
      setOrdering(false);
      return;
    }

    toast.success("Order created successfully!");
    setCart({ ...cart, items: [] });
    setOrdering(false);
  };

  const totalPrice = cart.items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.medicine.price,
    0,
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.medicine.imageUrl || "/placeholder.png"}
                alt={item.medicine.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-lg">{item.medicine.name}</p>
                <p className="text-gray-500">
                  ${item.medicine.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div>
              <span className="px-2">{item.quantity}</span>
            </div>

            <div className="hidden items-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Total & Order */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              ordering ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCreateOrder}
            disabled={ordering}
          >
            {ordering ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
