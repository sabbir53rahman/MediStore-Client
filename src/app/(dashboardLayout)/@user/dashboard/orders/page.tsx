"use client";

import { getMyOrdersAction } from "@/actions/order.actions";
import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  medicine: {
    name: string;
  };
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await getMyOrdersAction();

      if (error) {
        setError(error);
      } else {
        setOrders(data?.data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading your orders...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load orders
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        You haven’t placed any orders yet.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-2xl p-6 shadow-sm bg-white"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm">{order.id}</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium w-fit ${
                  statusStyles[order.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t" />

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm bg-gray-50 rounded-lg px-4 py-2"
                >
                  <span className="font-medium">
                    {item.medicine.name} × {item.quantity}
                  </span>
                  <span className="text-gray-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-lg font-semibold text-emerald-600">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
