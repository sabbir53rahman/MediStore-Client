import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/api.type";

interface Props {
  medicine: Medicine;
}

export const MedicineCard = ({ medicine }: Props) => {
  return (
    <div className="w-full max-w-[280px] rounded-xl bg-white p-3 shadow-sm hover:shadow-md transition">
      {/* Image + Discount */}
      <div className="relative rounded-lg bg-slate-100 p-3">
        <div className="relative h-36 w-full">
          <Image
            src={medicine.imageUrl || "/placeholder-medicine.png"}
            alt={medicine.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {medicine.name}
        </h3>

        <p className="text-xs text-gray-400">
          {medicine.description || "Strip"}
        </p>
        <p className="text-xs text-gray-500">
          {medicine.category.name || "Generic Brand"}
        </p>
      </div>

      {/* Price */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold text-primary">
          ৳ {medicine.price}
        </span>
      </div>

      {/* Button */}
      <Button
        asChild
        className="mt-3 w-full rounded-lg bg-sky-500 hover:bg-sky-600"
      >
        <Link href={`/medicines/${medicine.id}`}>Add to cart</Link>
      </Button>
    </div>
  );
};
