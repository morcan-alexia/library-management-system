import React, { useState } from "react";
import axios from "axios";
import './RegisterForm.css';

import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';


function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    prenume: "",
    nume: "",
    email: "",
    parola: "",
    telefon: "" 
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const API_URL = process.env.REACT_APP_API_URL;

    // Pregătim clientul de trimis la backend
    const client = {
      nume: `${formData.prenume} ${formData.nume}`,
      email: formData.email,
      telefon: formData.telefon,
      parola: formData.parola 
    };
    

    axios.post(`${API_URL}/clients`, client)
      .then((res) => {
        console.log("Client salvat:", res.data);
        onRegister(); // afișează lista de cărți
      })
      .catch((err) => {
        console.error("Eroare la înregistrare:", err);
        alert("Înregistrarea a eșuat.");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center",
        marginTop: "30px"
      }}
    >
      <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        <FaUserPlus style={{ color: '#B7372F' }} />
        Înregistrare
      </h2>
  
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prenume"
          placeholder="Prenume"
          value={formData.prenume}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="nume"
          placeholder="Nume"
          value={formData.nume}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="parola"
          placeholder="Parolă"
          value={formData.parola}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="tel"
          name="telefon"
          placeholder="Telefon"
          value={formData.telefon}
          onChange={handleChange}
          style={inputStyle}
          required
        />
  
        <button type="submit" style={buttonStyle}>Înregistrează-te</button>
      </form>
  
      <p style={{ marginTop: "15px", fontSize: "14px", color: "#334155" }}>
        Ai deja cont?{" "}
        <span
          style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => window.dispatchEvent(new CustomEvent("switchToLogin"))}
        >
          Autentifică-te
        </span>
      </p>
    </div>
  );
  
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#B7372F",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default RegisterForm;



