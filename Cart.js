import React from "react";
import "./cart.css";

function Cart({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { 
              ...item, 
              quantity: newQuantity, 
              totalPrice: newQuantity * item.price 
            }
          : item
      )
    );
  };

  const totalAmount = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-heading">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="cart-details">
                  <p className="cart-name">{item.name}</p>

                  {item.weight ? (
                    <p className="cart-weight">Total Weight: {item.weight}</p>
                  ) : (
                    <p className="cart-quantity">Total Quantity: {item.quantity}</p>
                  )}

                  <p className="cart-price">₹{item.totalPrice.toFixed(2)}</p>

                  {/* Quantity controls
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div> */}

                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
            <button className="buy-now-button">🛍️ Buy Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;