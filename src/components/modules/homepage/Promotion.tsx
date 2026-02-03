import React from "react";

const Promotions: React.FC = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 text-white h-64 flex flex-col justify-between group cursor-pointer">
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Summer Sale
            </span>
            <h3 className="text-3xl font-bold mt-4">
              Flat 25% Off <br />
              on Vitamins
            </h3>
            <p className="mt-2 text-blue-100 opacity-80">Use code: SUMMER25</p>
          </div>
          <button className="relative z-10 bg-white text-blue-600 font-bold px-6 py-2.5 rounded-xl w-fit group-hover:scale-105 transition-transform">
            Shop Now
          </button>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
          <img
            src="https://picsum.photos/seed/promo1/300/300"
            alt="Promo"
            className="absolute top-0 right-0 h-full w-1/2 object-cover opacity-30 mix-blend-overlay"
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-teal-500 p-8 text-white h-64 flex flex-col justify-between group cursor-pointer">
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Essential Care
            </span>
            <h3 className="text-3xl font-bold mt-4">
              Free Delivery <br />
              on First Order
            </h3>
            <p className="mt-2 text-teal-100 opacity-80">Orders above $30</p>
          </div>
          <button className="relative z-10 bg-white text-teal-600 font-bold px-6 py-2.5 rounded-xl w-fit group-hover:scale-105 transition-transform">
            Get Started
          </button>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-teal-400 rounded-full opacity-40 blur-2xl"></div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 text-white h-64 flex flex-col justify-between group cursor-pointer md:col-span-2 lg:col-span-1">
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Health Hub
            </span>
            <h3 className="text-3xl font-bold mt-4">
              Full Body <br />
              Health Checkup
            </h3>
            <p className="mt-2 text-indigo-100 opacity-80">
              Starting at just $49
            </p>
          </div>
          <button className="relative z-10 bg-white text-indigo-600 font-bold px-6 py-2.5 rounded-xl w-fit group-hover:scale-105 transition-transform">
            Book Appointment
          </button>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
