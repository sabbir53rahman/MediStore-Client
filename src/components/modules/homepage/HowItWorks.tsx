import { Search, FileText, Package } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Search Medicine",
    desc: "Find medicines easily using name or category.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Upload Prescription",
    desc: "Upload a valid prescription if required.",
  },
  {
    step: "03",
    icon: Package,
    title: "Fast Delivery",
    desc: "We deliver safely to your doorstep.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold">
          How It <span className="text-primary">Works</span>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl bg-background p-8 text-center shadow-sm"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                {item.step}
              </span>

              <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon size={28} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
