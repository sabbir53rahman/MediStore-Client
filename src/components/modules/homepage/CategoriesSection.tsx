import Link from "next/link";
import { Category } from "@/types/api.type";

interface Props {
  categories: Category[];
}

const ICONS = ["💊", "🩺", "🧪", "🩹", "🌿", "❤️", "🧠", "🧬"];

export default function CategoriesSection({ categories }: Props) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Shop by <span className="text-primary">Category</span>
          </h2>

          <Link
            href="/shop"
            className="text-sm font-medium text-sky-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {/* All */}
          <CategoryItem
            name="All"
            href="/shop?categoryId=All"
            icon="💊"
            highlight
          />

          {categories.map((category, index) => (
            <CategoryItem
              key={category.id}
              name={category.name}
              href={`/shop?categoryId=${category.id}`}
              icon={ICONS[index % ICONS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ */
/* Category Item */
/* ------------------------------ */

interface ItemProps {
  name: string;
  href: string;
  icon: string;
  highlight?: boolean;
}

function CategoryItem({ name, href, icon, highlight }: ItemProps) {
  return (
    <Link
      href={href}
      className={`
        group flex flex-col items-center gap-2 rounded-lg border bg-white p-3
        text-center transition
        hover:border-sky-400 hover:bg-sky-50
        ${highlight ? "border-sky-400 bg-sky-50" : "border-slate-200"}
      `}
    >
      <div
        className={`
          flex h-10 w-10 items-center justify-center rounded-full text-lg
          ${
            highlight
              ? "bg-sky-500 text-white"
              : "bg-slate-100 text-slate-600 group-hover:bg-sky-500 group-hover:text-white"
          }
          transition
        `}
      >
        {icon}
      </div>

      <span className="text-xs font-medium text-slate-800 line-clamp-1">
        {name}
      </span>
    </Link>
  );
}
