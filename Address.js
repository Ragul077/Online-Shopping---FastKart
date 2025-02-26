import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./address.css";

const Address = ({ onAdd }) => {
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    default: false,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({ ...address, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addresses", address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Address added successfully!");
      navigate("/yaddress");
    } catch (error) {
      alert("Error adding address. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add a new address</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Full name</label>
        <input type="text" name="fullName" value={address.fullName} onChange={handleChange} required />

        <label>Mobile number</label>
        <input type="text" name="mobile" value={address.mobile} onChange={handleChange} required />

        <label>Pincode</label>
        <input type="text" name="pincode" value={address.pincode} onChange={handleChange} required />

        <label>Flat, House no., Building, Apartment</label>
        <input type="text" name="house" value={address.house} onChange={handleChange} required />

        <label>Area, Street, Sector, Village</label>
        <input type="text" name="street" value={address.street} onChange={handleChange} required />

        <label>Landmark (optional)</label>
        <input type="text" name="landmark" value={address.landmark} onChange={handleChange} />

        <label>Town/City</label>
        <input type="text" name="city" value={address.city} onChange={handleChange} required />

        <label>State</label>
        <select name="state" value={address.state} onChange={handleChange} required>
          <option value="">Choose a state</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>

        <div className="checkbox">
          <input type="checkbox" name="default" checked={address.default} onChange={handleChange} />
          <label>Make this my default address</label>
        </div>

        <button type="submit" className="submit-btn">Add address</button>
      </form>
    </div>
  );
};

export default Address;
