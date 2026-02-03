export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
                M
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                MediStore
              </span>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed">
              Reinventing pharmacy with speed, transparency, and care. 24/7
              delivery across 50+ cities.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-sm">
              Services
            </h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Pharmacy Shop
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Doctor Consultation
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Lab Tests
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Health Packages
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-sm">
              Legal
            </h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Terms of Use
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Return Policy
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                FDA Regulations
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-sm">
              Newsletter
            </h4>
            <p className="text-slate-500 leading-relaxed">
              Subscribe for health updates and exclusive discounts.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-slate-400 font-medium italic">
            Empowering your wellness journey with digital innovation.
          </p>
          <div className="flex items-center gap-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-4 opacity-30 grayscale"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6 opacity-30 grayscale"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              className="h-4 opacity-30 grayscale"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
