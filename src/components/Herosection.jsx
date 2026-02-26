
function Herosection() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
        <video className="absolute h-[60vh] md:h-[70vh] w-full object-cover opacity-70 z-0 flex items-center justify-center " poster="/perfume.jpg" autoPlay loop controls={false} muted playsInline
        preload="metadata">
            <source src="perfumeSmell.mp4" type="video/mp4" /> Your browser does not support the video tag.
        </video>

        <div className="relative text-black flex flex-col items-center z-10 py-40 justify-center text-center">
          
            <h1 className="md:text-6xl text-2xl italic font-bold">Essence</h1>
            <p className="md:text-3xl text-xl italic">Premium Quality Perfumes</p>
          
        </div>
    </section>
  )
}

export default Herosection