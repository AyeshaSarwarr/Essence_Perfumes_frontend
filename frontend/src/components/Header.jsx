import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuthAndCart = () => {
    // 1. Check Auth Status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // 2. Check Cart Count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    checkAuthAndCart();

    // Listen for changes from other tabs or manual triggers
    window.addEventListener("storage", checkAuthAndCart);
    return () => window.removeEventListener("storage", checkAuthAndCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optional: localStorage.removeItem("cart"); // Clear cart on logout if desired
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navStyle = "relative tracking-widest text-sm uppercase transition duration-300";
  const activeStyle = "text-gray-900 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-gray-900";

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/60 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Brand */}
        <Link to="/" className="text-2xl font-serif tracking-wider text-gray-900">
          Essence
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-10">
          {["Home", "Collection", "About", "Contact"].map((item) => (
            <NavLink 
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
              className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : "text-gray-600 hover:text-gray-900"}`}
            >
              {item}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          
          {/* Auth Conditional Rendering */}
          <div className="hidden md:flex gap-6 text-sm tracking-wide items-center">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-600 hover:text-gray-900 transition">
                  Login
                </NavLink>
                <NavLink to="/signup" className="text-gray-600 hover:text-gray-900 transition border border-gray-900 px-4 py-1 rounded-full">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800 group-hover:text-black transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1 5h12m-5-5v5m-4 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-in fade-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;