import { useState } from "react";
import "./fruit.css";

import imggs1 from "./sweet/almondcake.jpg";
import imggs2 from "./sweet/birthday.jpg";
import imggs3 from "./sweet/blackforest.jpg";
import imggs4 from "./sweet/chocolatecake.jpg";
import imggs5 from "./sweet/cookies.jpg";
import imggs6 from "./sweet/dairymilk.jpg";
import imggs7 from "./sweet/halwa.jpg";
import imggs8 from "./sweet/icecreamcake.jpg";
import imggs9 from "./sweet/jalebi.jpg";
import imggs10 from "./sweet/kitkat.jpg";
import imggs11 from "./sweet/laddoo.jpg";
import imggs12 from "./sweet/milkhalwa.jpg";
import imggs13 from "./sweet/mysorepak.jpg";
import imggs14 from "./sweet/strawberrycake.jpg";
import imggs15 from "./sweet/vennilacake.jpg";
import imggs16 from "./sweet/whiteforest.jpg";

const sweetItems = [
  { id: 1, name: "Almond Cake", img: imggs1, price: 250, isWeightBased: true },
  { id: 2, name: "Birthday Cake", img: imggs2, price: 500, isWeightBased: true },
  { id: 3, name: "Black Forest Cake", img: imggs3, price: 450, isWeightBased: true },
  { id: 4, name: "Chocolate Cake", img: imggs4, price: 400, isWeightBased: true },
  { id: 5, name: "Cookies", img: imggs5, price: 150, isWeightBased: true },
  { id: 6, name: "Dairy Milk", img: imggs6, price: 50, isWeightBased: false },
  { id: 7, name: "Halwa", img: imggs7, price: 200, isWeightBased: true },
  { id: 8, name: "Icecream Cake", img: imggs8, price: 350, isWeightBased: true },
  { id: 9, name: "Jalebi", img: imggs9, price: 180, isWeightBased: true },
  { id: 10, name: "KitKat", img: imggs10, price: 40, isWeightBased: false },
  { id: 11, name: "Laddoo", img: imggs11, price: 220, isWeightBased: true },
  { id: 12, name: "Milk Halwa", img: imggs12, price: 230, isWeightBased: true },
  { id: 13, name: "Mysore Pak", img: imggs13, price: 250, isWeightBased: true },
  { id: 14, name: "Strawberry Cake", img: imggs14, price: 450, isWeightBased: true },
  { id: 15, name: "Vennila Cake", img: imggs15, price: 400, isWeightBased: true },
  { id: 16, name: "White Forest Cake", img: imggs16, price: 480, isWeightBased: true }
];

function Sweet({ cart, setCart }) {
  const [quantities, setQuantities] = useState({});
  const [weights, setWeights] = useState({});

  const handleWeightChange = (id, weight) => {
    setWeights((prev) => ({ ...prev, [id]: weight + "kg"}));
  };

  const addToCart = (item) => {
    let quantity = quantities[item.id] || 1;
    let weight = weights[item.id] || "1";

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
      {sweetItems.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.img} alt={item.name} className="card-img" />
          <div className="card-content">
            <h2>{item.name}</h2>
            <p>It's very delicious</p>
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
            <p className="price">₹{item.price} per {item.isWeightBased ? "kg" : "piece"}</p>
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

export default Sweet;