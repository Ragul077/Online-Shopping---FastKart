import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./YourAddresses.css";

const YourAddresses = () => {  // Add removeAddress as a prop
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const removeAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="container">
      <h2>Your Addresses</h2>

      <div className="address-list">
        {/* Add Address Box */}
        <div className="add-address" onClick={() => navigate("/address")}>
          <div className="add-icon">+</div>
          <p>Add address</p>
        </div>

        {/* Display Saved Addresses */}
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div className="address-card" key={addr.id}>
              {addr.isDefault && <p className="default-label">Default: <strong>amazon</strong></p>}
              <h3>{addr.fullName}</h3>
              <p>{addr.house}, {addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
              <p>Phone number: {addr.mobile}</p>
              <div className="actions">
                <button onClick={() => removeAddress(addr._id)}>Remove</button>

              </div>
            </div>
          ))
        ) : (
          <p>No addresses found. Please add one.</p>
        )}
      </div>
    </div>
  );
};

export default YourAddresses;
