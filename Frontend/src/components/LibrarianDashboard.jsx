import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import LoansList from "./LoansList";
import { FaBookOpen, FaPlus, FaClipboardList } from "react-icons/fa";

function LibrarianDashboard({ onLogout }) {
  const [view, setView] = useState("none");

  const renderSection = () => {
    if (view === "books") return <AdminDashboard showAddFormOnly={false} />;
    if (view === "add") return <AdminDashboard showAddFormOnly={true} />;
    if (view === "loans") return <LoansList />;
    return null;
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>
        Panou Bibliotecar
      </h2>

      <p style={welcomeText}>Bine ai venit, ai acces la gestionarea cărților și a împrumuturilor.</p>

      {/* Meniu butoane */}
      <nav style={navStyle}>
        <button style={buttonStyle} onClick={() => setView("books")}>
          <FaBookOpen style={{ marginRight: "6px" }} /> Panou Cărți
        </button>
        <button style={buttonStyle} onClick={() => setView("add")}>
          <FaPlus style={{ marginRight: "6px" }} /> Adaugă Carte
        </button>
        <button style={buttonStyle} onClick={() => setView("loans")}>
          <FaClipboardList style={{ marginRight: "6px" }} /> Împrumuturi
        </button>
      </nav>

      {/* Conținutul selectat */}
      <div style={{ padding: "20px" }}>
        {renderSection()}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  padding: "40px 30px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  maxWidth: "700px",
  margin: "50px auto",
  textAlign: "center"
};

const titleStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  fontSize: "1.8rem",
  marginBottom: "16px",
  color: "#000000"
};

const welcomeText = {
  marginBottom: "20px",
  color: "#4b5563",
  fontStyle: "italic"
};

const navStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "12px",
  marginBottom: "20px"
};

const buttonStyle = {
  padding: "10px 16px",
  backgroundColor: "#B7372F",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  transition: "background-color 0.3s"
};

export default LibrarianDashboard;


