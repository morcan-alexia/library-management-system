import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";


function LibrarianRegisterForm({ onRegister, onCancel }) {
  const [formData, setFormData] = useState({
    nume: "",
    email: "",
    parola: "",
    codAcces: ""
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/librarians`, formData);
      alert("Bibliotecar înregistrat cu succes!");
      onRegister();
    } catch (err) {
      console.error("Eroare înregistrare bibliotecar:", err);
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Înregistrarea a eșuat.");
      }
    }
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
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
        <FaUserPlus style={{ color: "#B7372F" }} />
        Înregistrare Bibliotecar
      </h2>
  
      <form onSubmit={handleSubmit}>
        <input
          name="nume"
          placeholder="Nume complet"
          value={formData.nume}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="parola"
          type="password"
          placeholder="Parolă"
          value={formData.parola}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="codAcces"
          placeholder="Cod de acces"
          value={formData.codAcces}
          onChange={handleChange}
          required
          style={inputStyle}
        />
  
        <button type="submit" style={buttonStyle}>Creează cont</button>
      </form>
  
      <p className="form-toggle" style={{ marginTop: "15px", fontSize: "14px", textAlign: "center" }}>
  Ai deja cont?{" "}
  <span
    className="form-link"
    onClick={() => window.dispatchEvent(new CustomEvent("switchToLibrarianLogin"))}
    style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }}
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
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#B7372F",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  margin: "20px auto"
};

export default LibrarianRegisterForm;


