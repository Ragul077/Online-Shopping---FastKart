import { useState } from 'react';
import './fruit.css';
import img1 from './fruit/img1.jpg';  
import img2 from './fruit/img2.jpg';  
import img3 from './fruit/img3.jpg';
import img4 from './fruit/img4.jpg';
import img5 from './fruit/img5.jpg';
import img6 from './fruit/img6.jpg';
import img7 from './fruit/img7.jpg';
import img8 from './fruit/img8.jpg';
import img9 from './fruit/img9.jpg';
import img10 from './fruit/img10.jpg';

const fruits = [
  { id: 1, name: "Orange", img: img1, price: 50 },
  { id: 2, name: "Apple", img: img2, price: 80 },
  { id: 3, name: "Grapes", img: img3, price: 60 },
  { id: 4, name: "Banana", img: img4, price: 30 },
  { id: 5, name: "Guava", img: img5, price: 40 },
  { id: 6, name: "Cherry", img: img6, price: 100 },
  { id: 7, name: "BlueBerry", img: img7, price: 120 },
  { id: 8, name: "Mango", img: img8, price: 90 },
  { id: 9, name: "Red Banana", img: img9, price: 35 },
  { id: 10, name: "StrawBerry", img: img10, price: 150 }
];

function Fruit({ cart, setCart }) {
  const [weights, setWeights] = useState({});

  const weightOptions = [
    { label: "3 kg", multiplier: 3 },
    { label: "2 kg", multiplier: 2 },
    { label: "1 kg", multiplier: 1 },
    { label: "500 g", multiplier: 0.5 },
    { label: "250 g", multiplier: 0.25 }
  ];

  const handleWeightChange = (id, event) => {
    const selectedWeight = weightOptions.find(option => option.label === event.target.value);
    setWeights({ ...weights, [id]: selectedWeight });
  };

  const addToCart = (fruit) => {
    const selectedWeight = weights[fruit.id] || weightOptions[2]; 
    const totalPrice = fruit.price * selectedWeight.multiplier;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === fruit.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === fruit.id
            ? { ...item, totalPrice: item.totalPrice + totalPrice }
            : item
        );
      } else {
        return [...prevCart, { ...fruit, weight: selectedWeight.label, totalPrice }];
      }
    });

    alert(`${fruit.name} (${selectedWeight.label}) added to cart for ₹${totalPrice}!`);
  };

  return (
    <div className="cards-container"> 
      {fruits.map((fruit) => (
        <div className='card' key={fruit.id}>
          <img src={fruit.img} alt={fruit.name} className="card-img" />
          <div className="card-content">
            <h2>{fruit.name}</h2>
            <p>It's very healthy</p>

            <select className="weight-dropdown" onChange={(e) => handleWeightChange(fruit.id, e)}>
              {weightOptions.map(option => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>

            <p className="price">
              ₹{(fruit.price * (weights[fruit.id]?.multiplier || 1)).toFixed(2)}  
              ({weights[fruit.id]?.label || "1 kg"} )
            </p>

            <div className="card-buttons">
              <button className="save-btn">🔖</button>
              <button className="add-btn" onClick={() => addToCart(fruit)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Fruit;
