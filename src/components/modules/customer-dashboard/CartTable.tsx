"use client";

interface Props {
  cartItems: any[];
}

export default function CartTable({ cartItems }: Props) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">My Cart</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Medicine</th>
            <th className="text-left p-2">Quantity</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.medicine.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${item.medicine.price}</td>
              <td className="p-2">${item.quantity * item.medicine.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
