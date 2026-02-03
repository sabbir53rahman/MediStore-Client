"use client";

interface Props {
  medicines: any[];
}

export default function MedicinesTable({ medicines }: Props) {
  console.log(medicines[0].category.name);

  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">My Medicines</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Category</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="border-b">
              <td className="p-2">{med.name}</td>
              <td className="p-2">{med.category?.name ?? "N/A"}</td>
              <td className="p-2">${med.price}</td>
              <td className="p-2">{med.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
