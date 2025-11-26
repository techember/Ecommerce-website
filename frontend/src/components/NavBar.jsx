import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const { search, setSearch, setShowSearch, getCartCount } =
    useContext(ShopContext);
  const navigate = useNavigate();

  // Focus input when search bar opens
  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  const handleLogout = async () => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSearchClick = () => {
    setShowSearchBar(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      // Navigate to collection page and show search
      navigate("/collection");
      setShowSearch(true);
      setShowSearchBar(false);
    }
  };

  const handleSearchClose = () => {
    setShowSearchBar(false);
    setSearch("");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Trendify" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={handleSearchClick}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search Products"
        />

        {/* Profile Icon + Dropdown */}
        <div className="relative group">
          <Link to={token ? "/accounts" : "/login"}>
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Your Profile"
            />
          </Link>
          {token && (
            <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
              <div className="flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100">
                <p
                  onClick={() => {
                    navigate("/accounts", { replace: true });
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Profile
                </p>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
        />
      </div>

      {/* Animated Search Bar Overlay */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          showSearchBar ? "w-full sm:w-96" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Search Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Search Products
            </h2>
            <button
              onClick={handleSearchClose}
              className="text-gray-600 hover:text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div className="p-5">
            <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-gray-600">
              <img src={assets.search_icon} className="w-4" alt="Search" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit(e);
                  }
                }}
                placeholder="Search for products..."
                className="flex-1 text-sm text-gray-700 outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={handleSearchSubmit}
              className="w-full py-3 mt-3 text-sm text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
            >
              Search
            </button>
          </div>

          {/* Search Tips */}
          <div className="px-5 py-4 text-xs text-gray-500">
            <p>💡 Press Enter to search</p>
            <p className="mt-1">
              Try searching for: shirts, shoes, accessories...
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Dropdown"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
