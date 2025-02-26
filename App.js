import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./component/Header";
import Fruit from "./component/Fruit";
import Home from "./component/Home";
import Vegetables from "./component/Vegetables";
import Meat from "./component/Meat";
import SeaFood from "./component/SeaFood";
import Ice from "./component/Ice";
import Juice from "./component/Juice";
import Sweet from "./component/Sweet";
import Hot from "./component/Hot";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Cooking from "./component/Cooking";
import Stationary from "./component/Stationary";

import "./App.css";
import Cart from "./component/Cart";
import YourAddresses from "./component/YourAddresses";
import Address from "./component/Address";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]); // ✅ Initialize as an empty array
  const addAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]); // ✅ Update addresses list
  };
  const removeAddress = (id) => {
    setAddresses((prevAddresses) => prevAddresses.filter((addr) => addr.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Header setSearchQuery={setSearchQuery} cart={cart}/> {/* Pass function to Header */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/fruits" element={<Fruit />} /> */}
          <Route path="/fruits" element={<Fruit cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/vegetable" element={<Vegetables searchQuery={searchQuery} cart={cart} setCart={setCart}/>} />
          <Route path="/meat" element={<Meat cart={cart} setCart={setCart}/>} />
          <Route path="/seafood" element={<SeaFood cart={cart} setCart={setCart}/>} />
          <Route path="/ice" element={<Ice cart={cart} setCart={setCart}/>} />
          <Route path="/juice" element={<Juice cart={cart} setCart={setCart}/>} />
          <Route path="/sweet" element={<Sweet cart={cart} setCart={setCart}/>} />
          <Route path="/hot" element={<Hot cart={cart} setCart={setCart}/>} />
          <Route path="/cooking" element={<Cooking cart={cart} setCart={setCart}/>} />
          <Route path="/stationary" element={<Stationary cart={cart} setCart={setCart}/>} />
          <Route path="/yaddress" element={<YourAddresses addresses={addresses} removeAddress={removeAddress}/>} />
          <Route path="/address" element={<Address onAdd={addAddress}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
