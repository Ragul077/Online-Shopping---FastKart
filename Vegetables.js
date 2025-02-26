import "./fruit.css";
import React, { useState } from "react";

import imgg1 from "./vegetables/imgs1.jpg";
import imgg2 from "./vegetables/imgs2.jpg";
import imgg3 from "./vegetables/imgs3.jpg";
import imgg4 from "./vegetables/imgs4.jpg";
import imgg5 from "./vegetables/imgs5.jpg";
import imgg6 from "./vegetables/imgs6.jpg";
import imgg7 from "./vegetables/imgs7.jpg";
import imgg8 from "./vegetables/imgs8.jpg";
import imgg9 from "./vegetables/imgs9.jpg";
import imgg10 from "./vegetables/imgs10.jpg";
import imgg11 from "./vegetables/imgs11.jpg";
import imgg12 from "./vegetables/imgs12.jpg";
import imgg13 from "./vegetables/imgs13.jpg";
import imgg14 from "./vegetables/imgs14.jpg";
import imgg15 from "./vegetables/imgs15.jpg";
import imgg16 from "./vegetables/imgs16.jpg";
import imgg17 from "./vegetables/imgs17.jpg";
import imgg18 from "./vegetables/imgs18.jpg";
import imgg19 from "./vegetables/imgs19.jpg";
import imgg20 from "./vegetables/imgs20.jpg";
import imgg21 from "./vegetables/imgs21.jpg";

const vegetables = [
  { id: 1, name: "Tomato", img: imgg1, price: 30 },
  { id: 2, name: "Onion", img: imgg2, price: 40 },
  { id: 3, name: "Potato", img: imgg3, price: 35 },
  { id: 4, name: "Cabbage", img: imgg4, price: 25 },
  { id: 5, name: "Carrot", img: imgg5, price: 50 },
  { id: 6, name: "Beetroot", img: imgg6, price: 45 },
  { id: 7, name: "Green Chilly", img: imgg7, price: 60 },
  { id: 8, name: "Bottle Gourd", img: imgg8, price: 30 },
  { id: 9, name: "Cauliflower", img: imgg9, price: 55 },
  { id: 10, name: "Bitter Gourd", img: imgg10, price: 40 },
  { id: 11, name: "Bean", img: imgg11, price: 50 },
  { id: 12, name: "Ginger", img: imgg12, price: 70 },
  { id: 13, name: "Capsicum", img: imgg13, price: 80 },
  { id: 14, name: "Brinjal", img: imgg14, price: 55 },
  { id: 15, name: "Coriander Leaves", img: imgg15, price: 20 },
  { id: 16, name: "Broccoli", img: imgg16, price: 90 },
  { id: 17, name: "Peas", img: imgg17, price: 75 },
  { id: 18, name: "Garlic", img: imgg18, price: 100 },
  { id: 19, name: "Spinach", img: imgg19, price: 30 },
  { id: 20, name: "Radish", img: imgg20, price: 25 },
  { id: 21, name: "Scallion", img: imgg21, price: 50 }
];

function Vegetables({ searchQuery, cart, setCart }) {
  const [selectedWeights, setSelectedWeights] = useState({});

  const handleWeightChange = (vegetableId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [vegetableId]: weight,
    }));
  };

  const addToCart = (vegetable) => {
    const weight = selectedWeights[vegetable.id] || "1kg";

    const weightMultiplier = {
      "3kg": 3,
      "2kg": 2,
      "1kg": 1,
      "500g": 0.5,
      "250g": 0.25
    }[weight] || 1;

    const totalPrice = vegetable.price * weightMultiplier;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === vegetable.id && item.weight === weight
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === vegetable.id && item.weight === weight
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * totalPrice }
            : item
        );
      }

      return [...prevCart, { ...vegetable, weight, quantity: 1, totalPrice }];
    });

    alert(`${vegetable.name} (${weight}) added to cart!`);
  };

  const filteredVegetables = vegetables.filter((veg) =>
    veg.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="vegetable-page">
      <div className="cards-container">
        {filteredVegetables.map((vegetable) => (
          <div className="card" key={vegetable.id}>
            <img src={vegetable.img} alt={vegetable.name} className="card-img" />
            <div className="card-content">
              <h2>{vegetable.name}</h2>
              <p>It's very healthy</p>
              <select
                className="weight-dropdown"
                value={selectedWeights[vegetable.id] || "1"}
                onChange={(e) => handleWeightChange(vegetable.id, e.target.value)}
              >
                <option value="3kg">3 kg</option>
                <option value="2kg">2 kg</option>
                <option value="1kg">1 kg</option>
                <option value="500g">500 g</option>
                <option value="250g">250 g</option>
              </select>
              <p className="price">₹{vegetable.price} per kg</p>
              <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(vegetable)}>Add to Cart</button>
            </div>
              {/* <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(vegetable)}>
                Add to Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vegetables;
