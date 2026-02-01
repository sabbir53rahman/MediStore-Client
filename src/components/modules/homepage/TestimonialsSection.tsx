import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Verified Customer",
    message:
      "Very reliable pharmacy. The medicines were delivered on time and well packaged. Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    name: "Imran Hossain",
    role: "Verified Customer",
    message:
      "Easy ordering process and genuine medicines. Customer support was also very helpful.",
    rating: 4,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Verified Customer",
    message:
      "Affordable prices and fast delivery. This is now my go-to online pharmacy.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Trusted by Thousands of{" "}
            <span className="text-primary">Happy Customers</span>
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Real reviews from customers who trust us with their health
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Rating */}
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < item.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-sm text-slate-600 leading-relaxed">
                “{item.message}”
              </p>

              {/* User */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {item.name[0]}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
