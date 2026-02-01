import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import banner from "@/assets/banner.jpg";

export default function HomeBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative grid items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-14">
        {/* Left Content */}
        <div className="text-white">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
            💊 Trusted Online Pharmacy
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Your Health, <br />
            <span className="text-cyan-300">Delivered to Your Door</span>
          </h1>

          <p className="mt-4 max-w-lg text-white/90">
            Order genuine medicines, healthcare products, and essentials from
            verified pharmacies — fast, safe, and affordable.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-slate-100"
            >
              <Link href="/medicines">Browse Medicines</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex gap-6 text-sm text-white/90">
            <div>✔ 100% Genuine</div>
            <div>✔ Fast Delivery</div>
            <div>✔ Licensed Sellers</div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full ">
          <div className="relative z-10 rounded-2xl bg-white p-6 shadow-2xl">
            <Image
              src={banner}
              alt="Medicine Products"
              width={500}
              height={500}
              className="w-full object-contain"
              priority
            />
          </div>

          {/* Floating pills */}
          <div className="absolute -left-6 top-10 h-14 w-14 rounded-full bg-cyan-400/80 blur-md" />
          <div className="absolute -right-6 bottom-10 h-20 w-20 rounded-full bg-indigo-400/80 blur-md" />
        </div>
      </div>
    </section>
  );
}
