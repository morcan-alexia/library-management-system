import React from "react";
import logo from "../assets/logo1.jpeg";

function Navbar({ setCurrentView, isAuthenticated, isLibrarian, handleLogout }) {
  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Bookly Logo" style={{ height: "40px", marginRight: "10px" }} />
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Bookly</span>
      </div>

      <div style={linkContainerStyle}>
        {!isAuthenticated && !isLibrarian && (
          <>
            <button style={buttonStyle} onClick={() => setCurrentView("home")}>Acasa</button>
            <button style={buttonStyle} onClick={() => setCurrentView("login")}>Login </button>
            <button style={buttonStyle} onClick={() => setCurrentView("librarian")}>Bibliotecar</button>
          </>
        )}
        {(isAuthenticated || isLibrarian) && (
          <button style={buttonStyle} onClick={handleLogout}>Delogare</button>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: "#f8f9fa",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #dee2e6"
};

const linkContainerStyle = {
  display: "flex",
  gap: "10px"
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#B7372F",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px"
};

export default Navbar;



