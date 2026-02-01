import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Medicine } from "@/types/api.type";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  medicine: Medicine;
  addToCart?: (medicine: Medicine) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ medicine, addToCart }) => {
  return (
    <div className="w-full max-w-[280px] rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative rounded-lg bg-slate-100 p-3">
        <div className="relative h-36 w-full">
          <Image
            src={medicine.imageUrl || "/placeholder-medicine.png"}
            alt={medicine.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        </div>

        {/* Out of stock badge */}
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

        <p className="text-xs text-gray-400 line-clamp-1">
          {medicine.description || "Strip"}
        </p>

        <p className="text-xs text-gray-500">
          {medicine.category?.name || "Generic Brand"}
        </p>
      </div>

      {/* Price */}
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

      {/* Button */}
      <Button
        disabled={medicine.stock === 0}
        onClick={() => addToCart?.(medicine)}
        className="mt-3 w-full rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        <ShoppingCart size={16} className="mr-2" />
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
