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
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = (await getMyOrdersAction()) as {
        data: { data: Order[] } | null;
        error: string | null;
      };

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
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-mono">{order.id}</td>
                <td className="px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.medicine.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 font-semibold text-emerald-600">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
