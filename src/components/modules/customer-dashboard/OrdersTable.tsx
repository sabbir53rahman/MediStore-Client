"use client";

interface Props {
  orders: any[];
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Order ID</th>
            <th className="text-left p-2">Items</th>
            <th className="text-left p-2">Total</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">{order.id}</td>
              <td className="p-2">
                {order.items.map((i: any) => i.medicine.name).join(", ")}
              </td>
              <td className="p-2">${order.totalAmount}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
