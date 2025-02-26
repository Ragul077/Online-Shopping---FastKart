import React, { useState } from "react";
import "./fruit.css";

import imggs2 from "./stationary/allout.webp";
import imggs3 from "./stationary/calculator.webp";
import imggs6 from "./stationary/cello.webp";
import imggs8 from "./stationary/colors.png";
import imggs13 from "./stationary/comfort.webp";
import imggs16 from "./stationary/cutterknife.webp";
import imggs17 from "./stationary/dairies.png";
import imggs18 from "./stationary/duster.webp";
import imggs19 from "./stationary/feviquick.webp";
import imggs20 from "./stationary/files.webp";
import imggs21 from "./stationary/geometrysets.png";
import imggs22 from "./stationary/harpic.webp";
import imggs23 from "./stationary/marker.webp";
import imggs24 from "./stationary/notes.png";
import imggs25 from "./stationary/paintbrush.png";
import imggs26 from "./stationary/scissor.png";
import imggs27 from "./stationary/tape.webp";

const stationaryItems = [
  { id: 1, name: "All Out", img: imggs2, price: 150 },
  { id: 2, name: "Calculator", img: imggs3, price: 300 },
  { id: 3, name: "Cello", img: imggs6, price: 50 },
  { id: 4, name: "Colors", img: imggs8, price: 200 },
  { id: 5, name: "Comfort", img: imggs13, price: 180 },
  { id: 6, name: "Cutter Knife", img: imggs16, price: 70 },
  { id: 7, name: "Dairy", img: imggs17, price: 250 },
  { id: 8, name: "Duster", img: imggs18, price: 90 },
  { id: 9, name: "Fevi Quick", img: imggs19, price: 40 },
  { id: 10, name: "Files", img: imggs20, price: 60 },
  { id: 11, name: "Geometry Box set", img: imggs21, price: 220 },
  { id: 12, name: "Harpic", img: imggs22, price: 130 },
  { id: 13, name: "Marker", img: imggs23, price: 50 },
  { id: 14, name: "Notes", img: imggs24, price: 120 },
  { id: 15, name: "Paint Brush", img: imggs25, price: 90 },
  { id: 16, name: "Scissors", img: imggs26, price: 110 },
  { id: 17, name: "Tapes", img: imggs27, price: 80 }
];

function Stationary({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount),
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const totalPrice = quantity * item.price;

    const updatedCart = cart.find((cartItem) => cartItem.id === item.id)
      ? cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice: cartItem.totalPrice + totalPrice }
            : cartItem
        )
      : [...cart, { ...item, quantity, totalPrice }];

    setCart(updatedCart);
    alert(`${quantity} x ${item.name} added to cart!`);
  };

  return (
    <div className="cards-container">
      {stationaryItems.map((item) => (
        <div className='card' key={item.id}>
          <img src={item.img} alt={item.name} className="card-img" />
          <div className="card-content">
            <h2>{item.name}</h2>
            <p className="price">₹{item.price} per piece</p>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{quantities[item.id] || 1}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </div>
            <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stationary;