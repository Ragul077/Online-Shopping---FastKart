import React, { useState } from "react";
import "./fruit.css";

import imggs1 from "./hot/Bananachips.jpg";  
import imggs2 from "./hot/bunstuffing.jpg";  
import imggs3 from "./hot/carrotchips.webp";
import imggs4 from "./hot/chickenroll.jpg";
import imggs5 from "./hot/coconutbun.jpg";
import imggs6 from "./hot/crunchymasalamurukku.webp";
import imggs7 from "./hot/eggpuff.jpg";
import imggs8 from "./hot/frenchfries.jpg";
import imggs9 from "./hot/karaboondi.webp";
import imggs10 from "./hot/masalabonda.jpg";
import imggs11 from "./hot/masalachanna.webp";
import imggs12 from "./hot/mixture.webp";
import imggs13 from "./hot/multigrainpuffs.jpg";
import imggs14 from "./hot/murukku.webp";
import imggs15 from "./hot/nutcracker.webp";
import imggs16 from "./hot/paalmurukku.jpg";
import imggs17 from "./hot/potatochip.webp";
import imggs18 from "./hot/sandwich.jpg";
import imggs19 from "./hot/vegpuff.jpg";

const hotItems = [
  { id: 1, name: "Banana Chips", img: imggs1, price: 150, isWeightBased: true },
  { id: 2, name: "Bun Stuffing", img: imggs2, price: 30, isWeightBased: false },
  { id: 3, name: "Carrot Chips", img: imggs3, price: 160, isWeightBased: true },
  { id: 4, name: "Chicken Roll", img: imggs4, price: 40, isWeightBased: false },
  { id: 5, name: "Coconut Bun", img: imggs5, price: 35, isWeightBased: false },
  { id: 6, name: "Crunchy Masala Murukku", img: imggs6, price: 140, isWeightBased: true },
  { id: 7, name: "Egg Puff", img: imggs7, price: 25, isWeightBased: false },
  { id: 8, name: "French Fries", img: imggs8, price: 120, isWeightBased: true },
  { id: 9, name: "Kara Boondi", img: imggs9, price: 130, isWeightBased: true },
  { id: 10, name: "Masala Bonda", img: imggs10, price: 110, isWeightBased: true },
  { id: 11, name: "Masala Channa", img: imggs11, price: 100, isWeightBased: true },
  { id: 12, name: "Mixture", img: imggs12, price: 125, isWeightBased: true },
  { id: 13, name: "Multi Grain Puffs", img: imggs13, price: 135, isWeightBased: true },
  { id: 14, name: "Murukku", img: imggs14, price: 115, isWeightBased: true },
  { id: 15, name: "Nut Cracker", img: imggs15, price: 140, isWeightBased: true },
  { id: 16, name: "Paal Murukku", img: imggs16, price: 150, isWeightBased: true },
  { id: 17, name: "Potato Chip", img: imggs17, price: 155, isWeightBased: true },
  { id: 18, name: "Sandwich", img: imggs18, price: 45, isWeightBased: false },
  { id: 19, name: "Veg Puff", img: imggs19, price: 30, isWeightBased: false }
];

function Hot({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});
  const [weights, setWeights] = useState({});

  const handleWeightChange = (id, weight) => {
    setWeights((prev) => ({ ...prev, [id]: weight + "kg" }));
  };

  const addToCart = (item) => {
    let quantity = quantities[item.id] || 1;
    let weight = weights[item.id] || "1kg";  

    let totalPrice = item.isWeightBased
      ? parseFloat(weight) * item.price
      : quantity * item.price;

    const updatedCart = cart.find((cartItem) => cartItem.id === item.id)
      ? cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: item.isWeightBased ? undefined : cartItem.quantity + quantity,
                weight: item.isWeightBased ? weight : undefined,
                totalPrice: cartItem.totalPrice + totalPrice,
              }
            : cartItem
        )
      : [
          ...cart,
          {
            ...item,
            quantity: item.isWeightBased ? undefined : quantity,
            weight: item.isWeightBased ? weight : undefined,
            totalPrice,
          },
        ];

    setCart(updatedCart);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="cards-container">
      {hotItems.map((item) => (
        <div className='card' key={item.id}>
          <img src={item.img} alt={item.name} className="card-img" />
          <div className="card-content">
            <h2>{item.name}</h2>
            <p>It's very Hot and Spicy</p>
            {item.isWeightBased ? (
              <select
                className="weight-dropdown"
                onChange={(e) => handleWeightChange(item.id, e.target.value)}
              >
                <option value="3">3 kg</option>
                <option value="2">2 kg</option>
                <option value="1">1 kg</option>
                <option value="0.5">500 g</option>
                <option value="0.25">250 g</option>
              </select>
            ) : (
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.id]: Math.max((prev[item.id] || 1) - 1, 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{quantities[item.id] || 1}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.id]: (prev[item.id] || 1) + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>
            )}
            <p className="price">
              ₹{item.price} per {item.isWeightBased ? "kg" : "piece"}
            </p>
            <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hot;
