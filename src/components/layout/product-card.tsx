import Image from "next/image";
import Link from "next/link"; // for navigation
import { ShoppingCart, Eye } from "lucide-react";
import { Medicine } from "@/types/api.type";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  medicine: Medicine;
  addToCart?: (medicine: Medicine) => void;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  medicine,
  addToCart,
  loading,
}) => {
  return (
    <div className="w-full lg:max-w-[320px] rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative rounded-lg bg-slate-100 p-3">
        <div className="relative h-36 w-full">
          <Image
            src={medicine.imageUrl || "/placeholder-medicine.png"}
            alt={medicine.name}
            fill
            className="object-contain"
          />
        </div>

        {medicine.stock === 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {medicine.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2">
          {medicine.description || "No description available"}
        </p>
        <p className="text-xs text-gray-500">
          Category: {medicine.category?.name || "Generic Brand"}
        </p>
      </div>

      {/* Price & Stock */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold text-sky-600">
          ৳ {medicine.price}
        </span>
        <span
          className={`text-xs font-semibold ${
            medicine.stock > 0 ? "text-emerald-600" : "text-red-500"
          }`}
        >
          Stock: {medicine.stock}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-3 flex gap-2">
        <Button
          disabled={medicine.stock === 0 || loading}
          onClick={() => addToCart?.(medicine)}
          className="flex-1 flex items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300"
        >
          <ShoppingCart size={16} className="mr-2" />
          {loading ? "Adding..." : "Add to cart"}
        </Button>

        <Link href={`/medicine/${medicine.id}`} className="flex-1">
          <Button
            variant="outline"
            className="flex items-center justify-center w-full rounded-lg border-sky-500 text-sky-500 hover:bg-sky-50"
          >
            <Eye size={16} className="mr-2" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
