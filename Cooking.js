import React, { useState } from "react";
import "./fruit.css";

import imggs2 from "./grocery/bournvita.webp";  
import imggs3 from "./grocery/bru.webp";
import imggs6 from "./grocery/cocnutoil.webp";
import imggs8 from "./grocery/cookingoil.webp";
import imggs13 from "./grocery/ghee.webp";
import imggs16 from "./grocery/rice.webp";
import imggs17 from "./grocery/brownchanna.webp";
import imggs18 from "./grocery/cornflour.webp";
import imggs19 from "./grocery/kadalaimaavu.webp";
import imggs20 from "./grocery/mustard.webp";
import imggs21 from "./grocery/mysoredaal.webp";
import imggs22 from "./grocery/pattanidaal.webp";   
import imggs23 from "./grocery/tamarind.webp";
import imggs24 from "./grocery/toordaal.webp";
import imggs25 from "./grocery/uriddaal.webp";
import imggs26 from "./grocery/whitechanna.webp";
import imggs27 from "./grocery/ajinomota.jpg";
import imggs28 from "./grocery/butter.jpg";
import imggs29 from "./grocery/greenchilli.jpg";
import imggs30 from "./grocery/karupatti.jpg";
import imggs31 from "./grocery/mayoneese.jpg";
import imggs32 from "./grocery/milk.jpg";
import imggs33 from "./grocery/parungayam.jpg";
import imggs34 from "./grocery/salt.jpg";
import imggs35 from "./grocery/sugar.jpg";
import imggs36 from "./grocery/tomatochause.jpg";
import imggs37 from "./grocery/sambar.jpg";
import imggs38 from "./grocery/turmeric.jpg";
import imggs39 from "./grocery/chickenmasala.webp";
import imggs40 from "./grocery/muttonmasala.webp";

const cookingItems = [
  { id: 1, name: "BournVita", img: imggs2, price: 250 },
  { id: 2, name: "Bru Coffee", img: imggs3, price: 150 },
  { id: 3, name: "Coconut Oil", img: imggs6, price: 200 },
  { id: 4, name: "Cooking Oil", img: imggs8, price: 180 },
  { id: 5, name: "Ghee", img: imggs13, price: 350 },
  { id: 6, name: "Rice", img: imggs16, price: 60 },
  { id: 7, name: "Brown Channa", img: imggs17, price: 80 },
  { id: 8, name: "Corn Flour", img: imggs18, price: 90 },
  { id: 9, name: "Kadalai Maavu", img: imggs19, price: 70 },
  { id: 10, name: "Mustard", img: imggs20, price: 40 },
  { id: 11, name: "Mysore Daal", img: imggs21, price: 100 },
  { id: 12, name: "Pattani Daal", img: imggs22, price: 120 },
  { id: 13, name: "Tamarind", img: imggs23, price: 90 },
  { id: 14, name: "Toor Daal", img: imggs24, price: 110 },
  { id: 15, name: "Urid Daal", img: imggs25, price: 130 },
  { id: 16, name: "White Channa", img: imggs26, price: 140 },
  { id: 17, name: "Ajinomoto", img: imggs27, price: 50 },
  { id: 18, name: "Butter", img: imggs28, price: 200 },
  { id: 19, name: "Green Chilli", img: imggs29, price: 30 },
  { id: 20, name: "Karupatti", img: imggs30, price: 80 },
  { id: 21, name: "Mayonnaise", img: imggs31, price: 160 },
  { id: 22, name: "Milk", img: imggs32, price: 50 },
  { id: 23, name: "Parungayam", img: imggs33, price: 70 },
  { id: 24, name: "Salt", img: imggs34, price: 30 },
  { id: 25, name: "Sugar", img: imggs35, price: 40 },
  { id: 26, name: "Tomato Sauce", img: imggs36, price: 90 },
  { id: 27, name: "Sambar Powder", img: imggs37, price: 150 },
  { id: 28, name: "Turmeric Powder", img: imggs38, price: 60 },
  { id: 29, name: "Chicken Masala", img: imggs39, price: 80 },
  { id: 30, name: "Mutton Masala", img: imggs40, price: 90 },
];

function Cooking({ cart, setCart }) {
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
      {cookingItems.map((item) => (
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

export default Cooking;
