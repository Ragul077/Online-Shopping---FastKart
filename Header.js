import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import './Header.css';
import axios from "axios";

export default function Header({ setSearchQuery }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  // ✅ Function to fetch user data
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, user is not logged in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ User data fetched:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("❌ Error fetching user:", error.response?.data || error.message);
      setUser(null);
    }
  };

  // ✅ Fetch user when the component loads
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Detect changes in localStorage (For Login Updates)
  useEffect(() => {
    const handleStorageChange = () => {
      fetchUser();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Detect token change and update user
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchUser();
    }
  }, [localStorage.getItem("token")]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // ✅ Trigger storage update
    setUser(null);
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="back">
       <header className="header">
        <div className="logo-section">
          <h1>🛒</h1>
          <div>
            <h1 className="title">FASTKART</h1>
            <p className="subtitle">Online Grocery Shopping Center</p>
          </div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search the product..."
            className="search-bar"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="but">
            <IoSearch />
          </button>
        </div>

        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/account">My Account</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="button-section">
          {user ? (
            <section className="profile-section">
              <div className="profile-dropdown">
                <button className="user-btn">👤 {user.name}</button>
                <div className="dropdown-menu">
                  <Link to="/yaddress" className="dropdown-link">My Account</Link>
                  <Link to="/orders" className="dropdown-link">My Orders</Link>
                  <Link to="/info" className="dropdown-link">My Info</Link>
                  <button onClick={handleLogout} className="dropdown-link logout-btn">Logout</button>
                </div>
              </div>
            </section>
          ) : (
            <Link to="/login" className="cart-btn">👤 Login</Link>
          )}
          <Link to="/cart" className="cart-btn">🛒 Cart</Link>
        </div>
      </header>

      <section>
        <div className="cat">
          <h1 className="cat1">Categories</h1> <br/>
          <Link to="/fruits">🍎 Fruits</Link> <br /> <br />
          <Link to="/vegetable">🥕 Vegetables</Link> <br />  <br /> 
          <Link to="/meat">🐔 Meat</Link> <br /> <br /> 
          <Link to="/seafood">🦐 Sea Foods</Link> <br /> <br /> 

          <div className="dropdown">
            <button onClick={() => setOpenDropdown(openDropdown === "frozen" ? null : "frozen")} className="drop-btn">
              <p>🍦 Frozen Foods</p>
            </button>
            {openDropdown === "frozen" && (
              <div className="dropdown-content">
                <Link to="/ice">🍦 Ice Cream</Link>
                <Link to="/juice">🧋 Juice</Link>
              </div>
            )}
          </div>

          <div className="dropdown1">
            <button onClick={() => setOpenDropdown(openDropdown === "bakes" ? null : "bakes")} className="drop-btn">
              <p>🎂 Bakes</p>
            </button>
            {openDropdown === "bakes" && (
              <div className="dropdown-content">
                <Link to="/hot">🌶️ Hot & Spicy</Link>
                <Link to="/sweet">🍫 Sweet</Link>
              </div>
            )}
          </div>

          <div className="dropdown2">
            <button onClick={() => setOpenDropdown(openDropdown === "grocery" ? null : "grocery")} className="drop-btn">
              <p className='Grocery'>✏️ Grocery</p>
            </button>
            {openDropdown === "grocery" && (
              <div className="dropdown-content">
                <Link to="/stationary">📚 Stationary</Link>
                <Link to="/cooking">🍳 Cooking</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
