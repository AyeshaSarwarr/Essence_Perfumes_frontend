import React from 'react';

function Contact() {
  const socialIcons = ["fb.png", "insta.png", "twitter.png"];

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle feedback logic
  };

  return (
    <section className=" min-h-screen pt-32 pb-20 px-6">
      {/* Page Header */}
      <div className="text-center mb-20">
        <span className="uppercase tracking-[0.5em] text-[10px] text-zinc-500 mb-4 block">
          Get In Touch
        </span>
        <h1 className="font-serif text-4xl md:text-5xl italic">
          Contact Essence
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Feedback Form Section */}
        <div className=" p-10 rounded-sm border border-zinc-800 shadow-2xl">
          <h2 className="font-serif text-2xl  mb-8 italic">Give your Feedback</h2>
          
          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-800">
                Full Name
              </label>
              <input 
                type="text" 
                id="name"
                placeholder="E.g. Alexander Dumas" 
                className="bg-transparent border-b border-zinc-700 py-3  focus:outline-none focus:border-white transition-colors font-light"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="requirements" className="text-[10px] uppercase tracking-widest text-zinc-500">
                Your Message
              </label>
              <textarea 
                id="requirements" 
                placeholder="How was your sensory experience?"
                className="bg-transparent border-b border-zinc-700 py-3  focus:outline-none focus:border-white transition-colors font-light h-32 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-4 bg-white text-black uppercase tracking-widest text-xs font-bold py-4 hover:bg-zinc-200 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div className="flex flex-col gap-12">
          
          {/* Info Block */}
          <div className=" p-10 rounded-sm border border-zinc-800 flex-1">
            <h2 className="font-serif text-2xl  mb-8 italic">Boutique Details</h2>
            <div className="space-y-6 text-zinc-400 font-light tracking-wide">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-600 tracking-[0.2em] mb-1">Inquiries</span>
                <p>essence@pk.com</p>
                <p>042 36300000</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-600 tracking-[0.2em] mb-1">Visit Us</span>
                <p>Main Boulevard, Gulberg III</p>
                <p>Lahore, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Social Media Block */}
          <div className=" p-8 rounded-sm border border-zinc-800">
            <h2 className="text-center text-[10px] uppercase tracking-[0.4em] text-zinc-800 mb-8">
              Follow Our Journey
            </h2>
            <div className="flex gap-8 justify-center items-center">
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <button 
                  key={social}
                  className="text-xs uppercase tracking-widest text-zinc-800 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;