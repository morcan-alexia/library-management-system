import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css';
import { FaSignInAlt } from "react-icons/fa";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const API_URL = process.env.REACT_APP_API_URL;

    axios.post(`${API_URL}/clients/login`, {
      email: email.trim().toLowerCase(),
      parola: parola.trim()
    })
    
      .then((res) => {
        localStorage.setItem("userId", res.data.id);
        onLogin();
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data || "Email sau parolă incorectă.");
        } else {
          alert("Nu s-a putut conecta la server.");
        }
      

      });
  };

  return (
    <div className="form-card">
      <h2 className="form-title">
        <FaSignInAlt className="form-icon" />
        Autentificare
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="ex: utilizator@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Introdu parola contului"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">
          Login
        </button>
        <p className="form-toggle">
  Nu ai cont?{" "}
  <span className="form-link" onClick={() => window.dispatchEvent(new CustomEvent("switchToRegister"))}>
    Înregistrează-te
  </span>
</p>




      </form>
    </div>
  );
}

export default LoginForm;







