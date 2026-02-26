import React from 'react';

function About() {
  return (
    <section className=" text-zinc-900 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <span className="uppercase tracking-[0.3em] text-sm text-zinc-500 font-light">
            Our Heritage
          </span>
          <h1 className="font-serif text-xl md:text-3xl lg:text-8xl italic font-light tracking-tight leading-tight">
            Artistry in Every Drop
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-light text-zinc-600 leading-relaxed italic">
            "Premium perfumes are not just liquids — they are carefully crafted compositions made through art, chemistry, and time."
          </p>
          <div className="h-20 w-px bg-zinc-300 mt-8 animate-pulse"></div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Video / Visual Element */}
          <div className="relative group overflow-hidden rounded-sm shadow-2xl">
            <video 
              className="w-full h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105" 
              poster="/perfume.jpg" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="perfumes.mp4" type="video/mp4" />
            </video>
            {/* Elegant overlay frame */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-10 md:pl-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif italic">The Essence Philosophy</h2>
              <div className="w-12 h-0.5 bg-zinc-800"></div>
              <p className="text-zinc-600 leading-8 font-light text-lg">
                At <span className="font-semibold text-zinc-900">Essence</span>, we believe fragrance is more than a scent — it is an identity, a memory, and a statement of confidence. Our passion lies in crafting premium perfumes that blend luxury, elegance, and long-lasting performance.
              </p>
              <p className="text-zinc-600 leading-8 font-light text-lg">
                Each fragrance is thoughtfully curated using high-quality ingredients to create a perfect balance of freshness, depth, and sophistication. We are dedicated to delivering scents that not only smell exceptional but also tell a unique story.
              </p>
            </div>

            <div className="bg-zinc-50 p-8 border-l-4 border-zinc-900 italic font-serif text-zinc-700">
              "The right perfume doesn’t just complete your look — it defines your presence."
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Footer Quote */}
      <div className="py-20 text-center border-t border-zinc-100">
         <p className="uppercase tracking-[0.5em] text-xs text-zinc-400">
           Est. 2026 — Crafted with Passion
         </p>
      </div>
    </section>
  );
}

export default About;