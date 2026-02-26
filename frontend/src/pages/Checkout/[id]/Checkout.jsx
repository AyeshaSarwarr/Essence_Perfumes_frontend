import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Checkout() {
  const { id } = useParams(); // Only exists if coming from "Buy Now"
  const navigate = useNavigate();

  // State for products being bought
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const prepareCheckout = async () => {
      try {
        if (id) {
          // MODE 1: Single Product (Buy Now)
          const res = await axios.get(`http://localhost:5000/product/${id}`);
          const item = {
            perfume_id: res.data.id,
            name: res.data.name,
            price: res.data.price,
            quantity: 1, // Default for Buy Now
            picture_url: res.data.picture_url
          };
          setCheckoutItems([item]);
          setTotalPrice(res.data.price);
        } else {
          // MODE 2: Full Cart (Checkout button)
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          if (storedCart.length === 0) {
            navigate("/"); // Send them home if cart is empty
            return;
          }

          // Fetch details for all items in cart
          const requests = storedCart.map(item => axios.get(`http://localhost:5000/product/${item.id}`));
          const responses = await Promise.all(requests);
          
          const fullItems = responses.map((res, index) => ({
            perfume_id: res.data.id,
            name: res.data.name,
            price: res.data.price,
            quantity: storedCart[index].quantity,
            picture_url: res.data.picture_url
          }));

          setCheckoutItems(fullItems);
          const total = fullItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          setTotalPrice(total);
        }
        setLoading(false);
      } catch (err) {
        setError("Could not prepare checkout.");
        setLoading(false);
      }
    };

    prepareCheckout();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let currentUserId = null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        currentUserId = decoded.id;
      } catch (err) { console.error("Token error", err); }
    }

    try {
      const orderData = {
        user_id: currentUserId,
        total_price: totalPrice,
        shipping_address: address,
        guest_email: email,
        guest_phone_number: phone,
        guest_name: name
      };

      // Prepare items for backend model
      const items = checkoutItems.map(item => ({
        perfume_id: item.perfume_id,
        price: item.price,
        quantity: item.quantity
      }));

      const response = await axios.post("http://localhost:5000/orders", 
        { orderData, items }, 
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      // If successful and we were in Cart Mode, clear the cart
      if (!id) {
        localStorage.removeItem("cart");
        // Optional: If logged in, you might want to call your "delete cart" backend route here
      }

      navigate('/thankyou', { state: { orderId: response.data.orderId } });
    } catch (err) {
      alert("Error placing order.");
    }
  };

  if (loading) return <p className="text-center mt-10">Preparing your order...</p>;

  return (
    <section className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">Complete Your Purchase</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        
        {/* Order Summary Side */}
        <div className="md:w-1/3 bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-4">
            {checkoutItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                   <img src={`/images/${item.picture_url}`} className="w-12 h-12 object-cover rounded" alt=""/>
                   <div>
                     <p className="font-bold text-sm">{item.name}</p>
                     <p className="text-xs">Qty: {item.quantity}</p>
                   </div>
                </div>
                <p className="font-bold">Rs {item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>Rs {totalPrice}</span>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white p-8 rounded-xl border shadow-sm md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" required className="border p-2 rounded" 
              value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email Address" required className="border p-2 rounded"
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" placeholder="Phone Number" required className="border p-2 rounded"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder="Shipping Address" required className="border p-2 rounded"
              value={address} onChange={(e) => setAddress(e.target.value)} />
            
            <button type="submit" className="bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition">
              Confirm Order (Cash on Delivery)
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;