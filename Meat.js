import "./fruit.css";
import React, { useState } from "react";

import imggs1 from "./meat/imgss1.jpg";
import imggs2 from "./meat/imgss2.jpg";
import imggs3 from "./meat/imgss3.jpg";
import imggs4 from "./meat/imgss4.jpg";
import imggs5 from "./meat/imgss5.jpg";
import imggs6 from "./meat/imgss6.jpg";

const meats = [
  { id: 1, name: "Goat Chunk", img: imggs1, price: 600 },
  { id: 2, name: "Pork Meat", img: imggs2, price: 500 },
  { id: 3, name: "Goat Head", img: imggs3, price: 400 },
  { id: 4, name: "Goat Bone Marrow", img: imggs4, price: 450 },
  { id: 5, name: "Chicken", img: imggs5, price: 250 },
  { id: 6, name: "Beef", img: imggs6, price: 550 }
];

function Meat({ searchQuery, cart, setCart }) {
  const [selectedWeights, setSelectedWeights] = useState({});

  const handleWeightChange = (meatId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [meatId]: weight + "kg"
    }));
  };

  const addToCart = (meat) => {
    const weight = selectedWeights[meat.id] || "1kg";

    const weightMultiplier = {
      "2kg": 2,
      "1kg": 1,
      "500g": 0.5,
      "250g": 0.25
    }[weight] || 1;

    const totalPrice = meat.price * weightMultiplier;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === meat.id && item.weight === weight
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === meat.id && item.weight === weight
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * totalPrice }
            : item
        );
      }

      return [...prevCart, { ...meat, weight, quantity: 1, totalPrice }];
    });

    alert(`${meat.name} (${weight}) added to cart!`);
  };

  const filteredMeats = meats.filter((meat) =>
    meat.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="meat-page">
      <div className="cards-container">
        {filteredMeats.map((meat) => (
          <div className="card" key={meat.id}>
            <img src={meat.img} alt={meat.name} className="card-img" />
            <div className="card-content">
              <h2>{meat.name}</h2>
              <p>It's very healthy</p>
              <select
                className="weight-dropdown"
                value={selectedWeights[meat.id] || "1kg"}
                onChange={(e) => handleWeightChange(meat.id, e.target.value)}
              >
                <option value="2kg">2 kg</option>
                <option value="1kg">1 kg</option>
                <option value="500g">500 g</option>
                <option value="250g">250 g</option>
              </select>
              <p className="price">₹{meat.price} per kg</p>
              <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(meat)}>Add to Cart</button>
            </div>
              {/* <button className="add-btn" onClick={() => addToCart(meat)}>
                Add to Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meat;
