import { useState } from "react";
import "./fruit.css";  

import anchovy from "./seafood/anchovy.jpg";
import bass from "./seafood/bash.jpg";
import carp from "./seafood/carp.jpg";
import cod from "./seafood/cod.jpg";
import crab from "./seafood/crab.jpg";
import flounder from "./seafood/flounder.jpg";
import octopus from "./seafood/octopus.jpg";
import prawn from "./seafood/prawn.jpg";

const seafoodItems = [
  { id: 1, name: "Anchovy", img: anchovy, price: 350 },
  { id: 2, name: "Bass", img: bass, price: 450 },
  { id: 3, name: "Carp", img: carp, price: 400 },
  { id: 4, name: "Cod", img: cod, price: 480 },
  { id: 5, name: "Crab", img: crab, price: 550 },
  { id: 6, name: "Flounder", img: flounder, price: 420 },
  { id: 7, name: "Octopus", img: octopus, price: 600 },
  { id: 8, name: "Prawn", img: prawn, price: 650 }
];

function SeaFood({ searchQuery, cart, setCart }) {
  const [selectedWeights, setSelectedWeights] = useState({});

  const handleWeightChange = (itemId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [itemId]: weight,
    }));
  };

  const addToCart = (item) => {
    const weight = selectedWeights[item.id] || "1kg";

    const weightMultiplier = {
      "2kg": 2,
      "1kg": 1,
      "500g": 0.5,
      "250g": 0.25
    }[weight] || 1;

    const totalPrice = item.price * weightMultiplier;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.weight === weight
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.weight === weight
            ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: (cartItem.quantity + 1) * totalPrice }
            : cartItem
        );
      }

      return [...prevCart, { ...item, weight, quantity: 1, totalPrice }];
    });

    alert(`${item.name} (${weight}) added to cart!`);
  };

  const filteredSeafood = seafoodItems.filter((item) =>
    item.name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="seafood-page">
      <div className="cards-container">
        {filteredSeafood.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.img} alt={item.name} className="card-img" />
            <div className="card-content">
              <h2>{item.name}</h2>
              <p>Fresh & healthy seafood</p>
              <select
                className="weight-dropdown"
                value={selectedWeights[item.id] || "1kg"}
                onChange={(e) => handleWeightChange(item.id, e.target.value)}
              >
                <option value="2kg">2 kg</option>
                <option value="1kg">1 kg</option>
                <option value="500g">500 g</option>
                <option value="250g">250 g</option>
              </select>
              <p className="price">₹{item.price} per kg</p>
              <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
              {/* <button className="add-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeaFood;
