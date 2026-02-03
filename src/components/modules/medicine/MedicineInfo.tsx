type MedicineInfoProps = {
  medicine: any;
};

const MedicineInfo = ({ medicine }: MedicineInfoProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={medicine.imageUrl || "/placeholder-medicine.png"}
        alt={medicine.name}
        className="rounded-lg shadow"
      />
      <div>
        <h1 className="text-3xl font-bold mb-3">{medicine.name}</h1>
        <p className="text-gray-600 mb-4">{medicine.description}</p>
        <p className="text-xl font-semibold text-green-600">
          ৳ {medicine.price}
        </p>
        <p className="text-sm text-gray-500 mt-2">Stock: {medicine.stock}</p>
      </div>
    </div>
  );
};

export default MedicineInfo;
