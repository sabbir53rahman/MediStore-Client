import { Medicine } from "@/types/api.type";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  medicine: Medicine;
  addToCart?: (medicine: Medicine) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ medicine, addToCart }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="h-48 overflow-hidden relative group">
        <img
          src={medicine.imageUrl ?? "/placeholder-medicine.png"}
          alt={medicine.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          {medicine.category.name}
        </span>

        {/* Stock badge */}
        {medicine.stock === 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 text-lg leading-tight">
            {medicine.name}
          </h3>

          <span className="text-emerald-600 font-black text-lg">
            ৳{medicine.price}
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-4 line-clamp-2">
          {medicine.description}
        </p>

        {/* Stock info */}
        <p className="text-xs font-semibold text-slate-600 mb-4">
          Stock:{" "}
          <span
            className={medicine.stock > 0 ? "text-emerald-600" : "text-red-500"}
          >
            {medicine.stock}
          </span>
        </p>

        <button
          disabled={medicine.stock === 0}
          onClick={() => addToCart?.(medicine)}
          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
