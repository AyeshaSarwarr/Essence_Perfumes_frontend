import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "Collection", path: "/collection" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#514f4f] text-zinc-300 pt-20 pb-10 mt-20 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="flex flex-col gap-8 md:w-1/3">
            <h1 className="font-serif text-4xl tracking-[0.2em] uppercase text-white">
              Essence
            </h1>
            <p className="text-zinc-400 font-light leading-relaxed text-sm italic">
              "A fragrance is a silent leaf of our soul." <br /> 
              Crafting premium scents in the heart of Lahore.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">
              Explore
            </h2>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-zinc-400 hover:text-white transition-all duration-500 font-light text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">
              Connect
            </h2>
            <div className="flex flex-col gap-4">
               <a href="mailto:essence@pk.com" className="text-sm font-light text-zinc-400 hover:text-white transition-colors">
                 essence@pk.com
               </a>
               <div className="flex gap-8 mt-2">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <button 
                    key={social} 
                    className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Luxury "Signature" Line */}
        <div className="relative py-8 border-t border-zinc-500/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
            &copy; {currentYear} Essence Perfumes &bull; All Rights Reserved
          </span>
          
          <div className="flex gap-10">
             <span className="text-[9px] text-zinc-400 uppercase tracking-[0.5em] hover:text-zinc-50 transition-colors cursor-default">Lahore</span>
             <span className="text-[9px] text-zinc-400 uppercase tracking-[0.5em] hover:text-zinc-50 transition-colors cursor-default">Paris</span>
             <span className="text-[9px] text-zinc-400 uppercase tracking-[0.5em] hover:text-zinc-50 transition-colors cursor-default">London</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;