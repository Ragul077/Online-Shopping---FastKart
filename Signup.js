import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async(e) => {  
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // localStorage.setItem('userName', name);
    // localStorage.setItem('userEmail', email);
    // localStorage.setItem('userPassword', password);

    // alert('Signup successful! Please login.');
    // navigate('/login');
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <span onClick={() => navigate('/login')} className="link">Login</span></p>
    </div>
  );
}
