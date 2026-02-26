import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Cart() {
  const [perfumes, setPerfumes] = useState([]);
  const [localQtys, setLocalQtys] = useState({}); // Stores { id: quantity }
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // 1. Initial Load: Get IDs and set initial local quantities
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Convert array [{id, quantity}] to object {id: quantity} for easy access
    const qtyMap = {};
    storedCart.forEach(item => {
      qtyMap[item.id] = item.quantity;
    });
    setLocalQtys(qtyMap);

    if (storedCart.length > 0) {
      fetchPerfumesDetails(storedCart.map(item => item.id));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPerfumesDetails = async (ids) => {
    try {
      const requests = ids.map(id => axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`));
      const responses = await Promise.all(requests);
      setPerfumes(responses.map(res => res.data));
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fast UI Update (No Flicker!)
  const handleQtyChange = (id, delta) => {
    setLocalQtys(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // 3. Save everything only at the end
  const handleProceed = async () => {
  setLoading(true); // Show a loader while syncing
  
  const finalCartArray = Object.keys(localQtys).map(id => ({
    id: id,
    quantity: localQtys[id]
  }));

  // Update LocalStorage first
  localStorage.setItem('cart', JSON.stringify(finalCartArray));

  // Handle Backend Sync if logged in
  const token = localStorage.getItem("token");
  if (token) {
    try {
      // Prepare data for your CartModel (product_id vs id)
      const itemsForBackend = Object.keys(localQtys).map(id => ({
        product_id: id,
        quantity: localQtys[id]
      }));

      // 2. Add the Authorization Header!
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cart`, 
        { items: itemsForBackend }, // user_id is safer to extract on backend from token
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      
      console.log("Database cart updated successfully");
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  }

  setLoading(false);
  navigate('/checkout'); // Now move to checkout
};

const handleDelete = (id) => {
  // 1. Remove from local quantities state
  const updatedQtys = { ...localQtys };
  delete updatedQtys[id];
  setLocalQtys(updatedQtys);

  // 2. Remove from perfumes details state
  setPerfumes(perfumes.filter(p => p.id !== id));

  // 3. Update localStorage immediately
  const updatedCartArray = Object.keys(updatedQtys).map(key => ({
    id: key,
    quantity: updatedQtys[key]
  }));
  localStorage.setItem('cart', JSON.stringify(updatedCartArray));
};

if (loading) return <p className="text-center mt-20">Loading...</p>;

if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-100 via-gray-200 to-zinc-300">
      <p className="text-gray-700 text-lg tracking-wide animate-pulse">
        Preparing your collection...
      </p>
    </div>
  );

const isEmpty = perfumes.length === 0;

return (
  <div className="min-h-screen bg-linear-to-br from-zinc-100 via-gray-200 to-zinc-300 py-16 px-6">

    <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-xl border border-gray-300 shadow-2xl rounded-3xl p-10">

      <h1 className="text-4xl font-serif text-center text-gray-900 tracking-wide mb-12">
        Your Cart
      </h1>

      {isEmpty ? (
        /* ================= EMPTY STATE ================= */
        <div className="text-center py-20">
          <div className="w-16 h-0.5 bg-gray-700 mx-auto mb-6 opacity-60"></div>

          <p className="text-xl text-gray-700 mb-4">
            Your fragrance collection is empty.
          </p>

          <p className="text-gray-600 mb-8">
            Discover timeless scents crafted with elegance.
          </p>

          <button
            onClick={() => navigate("/Collection")}
            className="px-8 py-3 rounded-full border border-gray-800 text-gray-900 tracking-widest uppercase text-sm
                       hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <>
          {/* ================= CART ITEMS ================= */}
          <div className="space-y-8">
            {perfumes.map((perfume) => {
              const qty = localQtys[perfume.id] || 0;

              return (
                <div
                  key={perfume.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-6"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={`/images/${perfume.picture_url}`}
                      className="w-24 h-24 object-cover rounded-2xl shadow-md"
                      alt=""
                    />
                    <div>
                      <h2 className="text-xl font-serif text-gray-900">
                        {perfume.name}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Rs {perfume.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10 mt-6 md:mt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-400 rounded-full px-4 py-2 gap-4 bg-white/60">
                      <button
                        onClick={() => handleQtyChange(perfume.id, -1)}
                        className="text-lg text-gray-700 hover:text-black transition"
                      >
                        −
                      </button>
                      <span className="text-lg font-medium w-6 text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(perfume.id, 1)}
                        className="text-lg text-gray-700 hover:text-black transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-lg font-semibold text-gray-900 w-24 text-right">
                      Rs {perfume.price * qty}
                    </p>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(perfume.id)}
                      className="text-gray-500 hover:text-black transition text-sm tracking-wide"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= TOTAL SECTION ================= */}
          <div className="text-right mt-16 border-t border-gray-300 pt-8">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">
              Grand Total: Rs{" "}
              {perfumes.reduce(
                (sum, p) => sum + p.price * (localQtys[p.id] || 0),
                0
              )}
            </h3>

            <button
              onClick={handleProceed}
              className="px-10 py-3 rounded-full border border-gray-900 text-gray-900 tracking-widest uppercase text-sm
                         hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);
}

export default Cart;