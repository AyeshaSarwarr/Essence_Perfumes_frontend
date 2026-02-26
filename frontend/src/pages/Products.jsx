import React from 'react';
import OurProducts from '../components/OurProducts';

function Products() {
  return (
    <div className=" min-h-screen">
      {/* Header / Hero Section */}
      <header className="pt-32 pb-16 px-6 text-center">
        <span className="uppercase tracking-[0.5em] text-[10px] text-zinc-500 mb-4 block">
          Exquisite Scents
        </span>
        <h1 className="font-serif text-4xl md:text-6xl  italic tracking-tight">
          The Collection
        </h1>
        <div className="w-16 h-px bg-zinc-700 mx-auto mt-8"></div>
      </header>

      {/* Product Feed Section */}
      <main className="max-w-7xl mx-auto pb-24">
        <OurProducts />
      </main>

      {/* Subtle Footer Note */}
      <footer className="pb-16 text-center">
        <p className="text-zinc-600 text-xs tracking-widest uppercase">
          Each bottle tells a story of elegance
        </p>
      </footer>
    </div>
  );
}

export default Products;