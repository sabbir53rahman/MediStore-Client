import { Divide } from "lucide-react";
import React from "react";

function Promo() {
  return (
    <div>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 rounded-[40px] overflow-hidden relative p-12 sm:p-20 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Healthcare in <br />
              <span className="text-blue-400">your pocket.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              Download the MediQuick app to manage your family's health, get
              personalized deals, and order refills in one tap.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-100 transition-all">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.523 15.341c-.551 0-1.121-.21-1.461-.631-.41-.49-.41-1.28-.01-1.78.34-.421.91-.641 1.46-.641.56 0 1.12.22 1.46.641.4.5.4 1.29 0 1.78-.34.421-.9.631-1.449.631zm-11.045 0c-.551 0-1.121-.21-1.461-.631-.41-.49-.41-1.28-.01-1.78.34-.421.91-.641 1.46-.641.56 0 1.12.22 1.46.641.4.5.4 1.29 0 1.78-.34.421-.91.631-1.449.631zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-3 0c0-1.03-.25-2.01-.69-2.87l1.45-2.51a.5.5 0 10-.86-.5l-1.47 2.54A7.952 7.952 0 0012 5a7.95 7.95 0 00-5.43 2.16l-1.47-2.54a.5.5 0 00-.86.5l1.45 2.51A7.94 7.94 0 005 12c0 3.86 3.14 7 7 7s7-3.14 7-7z" />
                </svg>
                App Store
              </button>
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-100 transition-all">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 3.5v17a1 1 0 001.5.86l14.24-8.5a1 1 0 000-1.72L6.5 2.64A1 1 0 005 3.5z" />
                </svg>
                Google Play
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <img
              src="https://picsum.photos/seed/phone/600/800"
              alt="App Preview"
              className="rounded-3xl shadow-2xl rotate-6 hover:rotate-0 transition-all duration-700 w-3/4 mx-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Promo;
