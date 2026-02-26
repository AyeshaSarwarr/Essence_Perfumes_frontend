import React from "react";

function Thankyou() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-100 via-gray-200 to-zinc-300 flex items-center justify-center px-6">
      
      <div className="bg-white/40 backdrop-blur-xl border border-gray-300 shadow-2xl rounded-3xl p-12 max-w-xl w-full text-center">
        
        {/* Decorative Divider */}
        <div className="w-16 h-0.5 bg-gray-700 mx-auto mb-8 opacity-60"></div>

        <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-gray-900 mb-6">
          Thank You
        </h1>

        <p className="text-gray-700 text-lg mb-2 tracking-wide">
          Your purchase has been confirmed.
        </p>

        <p className="text-gray-600 mb-8">
          Your fragrance will arrive within 
          <span className="font-semibold text-gray-900"> 3–4 working days</span>.
        </p>

        {/* Subtle Divider */}
        <div className="w-10 h-px bg-gray-400 mx-auto mb-8 opacity-50"></div>

        <button
          onClick={() => (window.location.href = "/Collection")}
          className="px-8 py-3 rounded-full border border-gray-800 text-gray-900 tracking-widest uppercase text-sm
                     hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out shadow-md"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default Thankyou;