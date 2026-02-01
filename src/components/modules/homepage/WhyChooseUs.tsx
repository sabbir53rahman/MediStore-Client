import { ShieldCheck, Truck, BadgeCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Medicines",
    desc: "All medicines are sourced from licensed pharmacies only.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Get your medicines delivered within 24–48 hours.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Sellers",
    desc: "Every seller is verified and approved by our team.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our support team is always ready to help you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold">
          Why Choose <span className="text-primary">MediStore</span>
        </h2>

        <p className="mt-2 text-center text-muted-foreground">
          Trusted by thousands for safe and reliable medicine delivery
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border bg-background p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                <item.icon size={26} />
              </div>

              <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
