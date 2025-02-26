import React, { useState } from "react";
import "./fruit.css";

import imggs1 from "./ice/butter.jpg";
import imggs2 from "./ice/kulfi.jpg";
import imggs3 from "./ice/snowice.jpg";
import imggs4 from "./ice/vennila.jpg";
import imggs5 from "./ice/amul.jpg";
import imggs6 from "./ice/mango.jpg";
import imggs7 from "./ice/strawberry.jpg";
import imggs8 from "./ice/vennilacone.jpg";
import imggs9 from "./ice/chocobar.jpg";
import imggs10 from "./ice/mangocup.jpg";
import imggs11 from "./ice/chocolatecup.jpg";
import imggs12 from "./ice/mangostick.jpg";
import imggs13 from "./ice/milk icecream.jpg";
import imggs14 from "./ice/oreocup.jpg";
import imggs15 from "./ice/strawberrycup.jpg";

const icecreams = [
  { id: 1, name: "Butter Scotch", img: imggs1, price: 150 },
  { id: 2, name: "Kulfi", img: imggs2, price: 100 },
  { id: 3, name: "Snow Icecream", img: imggs3, price: 120 },
  { id: 4, name: "Vennila Icecream", img: imggs4, price: 130 },
  { id: 5, name: "Amul Icecreams", img: imggs5, price: 140 },
  { id: 6, name: "Mango Cone", img: imggs6, price: 90 },
  { id: 7, name: "Strawberry Cone", img: imggs7, price: 100 },
  { id: 8, name: "Vennila Cone", img: imggs8, price: 110 },
  { id: 9, name: "Chocobar", img: imggs9, price: 80 },
  { id: 10, name: "Mango Box Icecream", img: imggs10, price: 200 },
  { id: 11, name: "Chocolate Box Icecream", img: imggs11, price: 210 },
  { id: 12, name: "Mango Stick Icecream", img: imggs12, price: 90 },
  { id: 13, name: "Milk Icecream", img: imggs13, price: 130 },
  { id: 14, name: "Oreo Box Icecream", img: imggs14, price: 220 },
  { id: 15, name: "Strawberry Box Icecream", img: imggs15, price: 230 },
];

function Ice({ searchQuery, cart, setCart }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(newQuantity, 1),
    }));
  };

  const addToCart = (icecream) => {
    const quantity = quantities[icecream.id] || 1;
    const totalPrice = icecream.price * quantity;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === icecream.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === icecream.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * icecream.price,
              }
            : item
        );
      }

      return [...prevCart, { ...icecream, quantity, totalPrice }];
    });

    alert(`${icecream.name} (x${quantity}) added to cart!`);
  };

  const filteredIcecreams = icecreams.filter((ice) =>
    ice.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="cards-container">
      {filteredIcecreams.map((icecream) => (
        <div className="card" key={icecream.id}>
          <img src={icecream.img} alt={icecream.name} className="card-img" />
          <div className="card-content">
            <h2>{icecream.name}</h2>
            <p>It's very delicious</p>
            <p className="price">₹{icecream.price} per piece</p>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(icecream.id, (quantities[icecream.id] || 1) - 1)}
              >
                -
              </button>
              <span>{quantities[icecream.id] || 1}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(icecream.id, (quantities[icecream.id] || 1) + 1)}
              >
                +
              </button>
            </div>
            <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(icecream)}>Add to Cart</button>
            </div>
            {/* <button className="add-btn" onClick={() => addToCart(icecream)}>
              Add to Cart
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Ice;
