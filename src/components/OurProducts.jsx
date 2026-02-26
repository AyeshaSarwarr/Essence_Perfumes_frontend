import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function OurProducts({ limit }) {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true); // Reset loading state when limit changes
      try {
        const url = limit 
          ? `${process.env.REACT_APP_API_URL}/product?limit=${limit}` 
          : `${process.env.REACT_APP_API_URL}/product`;
        
        const response = await axios.get(url);
        setPerfumes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Could not load perfumes. Try again later.");
        setLoading(false);
      }
    };

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    fetchPerfumes();
  }, [limit]); 

const addToCart = (productId) => {
  setCart(prev => {
    const existing = prev.find(item => item.id === productId);

    let updatedCart;

    if (existing) {
      updatedCart = prev.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...prev, { id: productId, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    return updatedCart;
  });

  alert("Added to cart!");
};

  if (loading) return <p className="text-center mt-10">Loading scents...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center gap-10 my-10">
        {perfumes.map((perfume) => (
          <div 
            key={perfume.id} 
            className="flex flex-col gap-4 text-center border-2 border-gray-200 rounded-2xl p-6 md:w-[25vw] transition-transform hover:scale-105 shadow-sm"
          >
            <img 
              src={`/images/${perfume.picture_url}`} 
              alt={perfume.name} 
              className="md:h-[30vh] w-full object-cover rounded-2xl"
            />
            <h1 className="text-xl font-bold">{perfume.name}</h1>
            <p className="text-lg text-gray-700">Rs {perfume.price}</p>
            <div className="text-sm text-gray-500">
              <span>{perfume.gender} • {perfume.size_ml} ml</span>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              
              <Link 
                to={`/Checkout/${perfume.id}`}
                className="bg-black text-white rounded-xl py-2 hover:bg-gray-800 transition text-center"
              >
                Buy Now
              </Link>
              <button 
                onClick={() => addToCart(perfume.id)} 
                className="border-2 border-black rounded-xl py-2 hover:bg-gray-100 transition cursor-pointer font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurProducts;