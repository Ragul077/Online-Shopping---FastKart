import React, { useState } from "react";
import imggs1 from "./juice/7up.jpg";
import imggs2 from "./juice/applejuice.jpg";
import imggs3 from "./juice/badammilk.jpg";
import imggs4 from "./juice/coconut.jpg";
import imggs5 from "./juice/cola.jpg";
import imggs6 from "./juice/grapesjuice.jpg";
import imggs7 from "./juice/lemon.jpg";
import imggs8 from "./juice/lemonsoda.jpg";
import imggs9 from "./juice/mangojuice.jpg";
import imggs10 from "./juice/mixedjuice.jpg";
import imggs11 from "./juice/orangejuice.jpg";
import imggs12 from "./juice/pepsi.jpg";
import imggs13 from "./juice/rosemilk.jpg";
import imggs14 from "./juice/strawberryjuice.jpg";
import "./fruit.css";

const juices = [
  { id: 1, name: "7Up Juice", img: imggs1, price: 60 },
  { id: 2, name: "Apple Juice", img: imggs2, price: 80 },
  { id: 3, name: "Badam Milk", img: imggs3, price: 100 },
  { id: 4, name: "Coconut Milk", img: imggs4, price: 50 },
  { id: 5, name: "Coca-Cola", img: imggs5, price: 40 },
  { id: 6, name: "Grapes Juice", img: imggs6, price: 90 },
  { id: 7, name: "Lemon Juice", img: imggs7, price: 70 },
  { id: 8, name: "Lemon Soda", img: imggs8, price: 75 },
  { id: 9, name: "Mango Juice", img: imggs9, price: 85 },
  { id: 10, name: "Mixed Fruit Juice", img: imggs10, price: 95 },
  { id: 11, name: "Orange Juice", img: imggs11, price: 90 },
  { id: 12, name: "Pepsi", img: imggs12, price: 40 },
  { id: 13, name: "Rose Milk", img: imggs13, price: 65 },
  { id: 14, name: "Strawberry Juice", img: imggs14, price: 110 },
];

function Juice({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const addToCart = (juice) => {
    const quantity = quantities[juice.id] || 1;
    const updatedCart = cart.find((item) => item.id === juice.id)
      ? cart.map((item) =>
          item.id === juice.id
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * item.price }
            : item
        )
      : [...cart, { ...juice, quantity, totalPrice: quantity * juice.price }];

    setCart(updatedCart);
    alert(`${juice.name} added to cart!`);
  };

  return (
    <div className="cards-container">
      {juices.map((juice) => (
        <div className="card" key={juice.id}>
          <img src={juice.img} alt={juice.name} className="card-img" />
          <div className="card-content">
            <h2>{juice.name}</h2>
            <p>Fresh and healthy</p>
            <p className="price">₹{juice.price} per piece</p>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => decreaseQuantity(juice.id)}>
                -
              </button>
              <span>{quantities[juice.id] || 1}</span>
              <button className="quantity-btn" onClick={() => increaseQuantity(juice.id)}>
                +
              </button>
            </div>
            <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <span className="button-gap"></span>
              <button className="add-btn" onClick={() => addToCart(juice)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Juice;
