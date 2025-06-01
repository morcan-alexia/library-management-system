import React, { useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";

function LibrarianLogin({ onLoginLibrarian }) {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/librarians/login`, {
        email,
        parola,
      });

      console.log("Autentificare bibliotecar reusita:", res.data);
      onLoginLibrarian(res.data); // Trimite obiectul bibliotecar mai departe
    } catch (err) {
      console.error("Eroare autentificare:", err);
      alert("Email sau parola incorecta.");
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
        <FaUserShield style={{ color: "#B7372F" }} />
        Login Bibliotecar
      </h2>
  
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Parola"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Autentifică-te</button>
      </form>
  
      <p className="form-toggle" style={{ marginTop: "15px", fontSize: "14px", textAlign: "center" }}>
  Nu ai cont?{" "}
  <span
    className="form-link"
    onClick={() => window.dispatchEvent(new CustomEvent("switchToLibrarianRegister"))}
    style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }}
  >
    Înregistrează-te
  </span>
</p>

      
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#B7372F",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default LibrarianLogin;
