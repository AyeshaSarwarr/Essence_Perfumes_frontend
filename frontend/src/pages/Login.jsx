import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {

    const response = await axios.post("http://localhost:5000/user/login", {email: form.email, password: form.password});

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    
    localStorage.setItem("user", JSON.stringify(user));

    // 3. Handle your Cart Merge Logic here!
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (localCart.length > 0) {
      await axios.post("http://localhost:5000/cart", 
        { items: localCart }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("cart"); // Clear it after merging to DB
    }

    navigate("/");
  } catch (err) {
     alert(err.response?.data?.message || "Authentication failed!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center ">
      
      <div className="backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl p-10 w-100 border border-white/40">
        
        <h1 className="text-4xl font-serif text-center mb-8 text-gray-800 tracking-wide">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl tracking-wide hover:bg-gray-800 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="underline hover:text-black">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;