import React, { useEffect, useState } from "react";
import "./BookList.css";
import axios from "axios";
import { FaUser, FaTags, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {FaBookOpen, FaCalendarAlt, FaAlignLeft,FaBook,FaSearch } from "react-icons/fa";


function BookList({ searchable = false }) {
  const [carti, setCarti] = useState([]);
  const [carteSelectata, setCarteSelectata] = useState(null);
  const [detaliiCarte, setDetaliiCarte] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/books`)
      .then((res) => {
        setCarti(res.data);
      })
      .catch((err) => {
        console.error("Eroare la preluarea cărților:", err);
      });
  }, []);

  const handleCardClick = async (carte) => {
    setCarteSelectata(carte);
    try {
      const res = await axios.get(`${API_URL}/bookdetails/${carte.id}`);
      setDetaliiCarte(res.data);
    } catch (err) {
      console.error("Eroare la preluarea detaliilor:", err);
      setDetaliiCarte(null);
    }
  };

  const inchideModal = () => {
    setCarteSelectata(null);
    setDetaliiCarte(null);
  };
const userId = localStorage.getItem("userId");

  const imprumutaCarte = async (idCarte) => {
    try {
      await axios.post(`${API_URL}/loans`, {
        idClient:  parseInt(userId),
        idBook: idCarte
      });

      setCarti(prev =>
        prev.map(c => c.id === idCarte ? { ...c, disponibil: false } : c)
      );

      alert("Cartea a fost împrumutată cu succes!");
    } catch (err) {
      console.error("Eroare la împrumut:", err);
      alert("Împrumutul a eșuat.");
    }
  };

  const returneazaCarte = async (idCarte) => {
    try {
      const res = await axios.get(`${API_URL}/loans`);
      const imprumutActiv = res.data.find(
        (l) => l.idBook === idCarte && l.dataReturnare === null
      );

      if (!imprumutActiv) {
        alert("Nu există un împrumut activ pentru această carte.");
        return;
      }

      await axios.put(`${API_URL}/loans/return/${imprumutActiv.id}`);

      setCarti(prev =>
        prev.map(c => c.id === idCarte ? { ...c, disponibil: true } : c)
      );

      alert("Cartea a fost returnată cu succes!");
    } catch (err) {
      console.error("Eroare la returnare:", err);
      alert("Returnarea a eșuat.");
    }
  };

  const cartiFiltrate = carti.filter(carte =>
    carte.titlu.toLowerCase().includes(searchTerm.toLowerCase()) &&
    carte.autor.toLowerCase().includes(filterAuthor.toLowerCase()) &&
    carte.categorie.toLowerCase().includes(filterCategory.toLowerCase())
  );

  return (
    <div className="booklist-container">
      <h2 className="booklist-title">Lista de cărți</h2>

      {searchable && (
      <div style={{ marginBottom: "20px" }}>
        {/* Căutare titlu */}
        <div style={{ position: "relative", display: "inline-block", marginRight: "10px", marginBottom: "10px" }}>
          <FaSearch style={{
            position: "absolute",
            top: "40%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "#888"
          }} />
          <input
            type="text"
            placeholder="Caută după titlu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: "34px" }}
          />
        </div>

        {/* Filtru autor */}
        <div style={{ position: "relative", display: "inline-block", marginRight: "10px", marginBottom: "10px" }}>
          <FaSearch style={{
            position: "absolute",
            top: "40%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "#888"
          }} />
          <input
            type="text"
            placeholder="Filtrează după autor..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            style={{ ...inputStyle, paddingLeft: "34px" }}
          />
        </div>

        {/* Filtru categorie */}
        <div style={{ position: "relative", display: "inline-block", marginRight: "10px", marginBottom: "10px" }}>
          <FaSearch style={{
            position: "absolute",
            top: "40%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "#888"
          }} />
          <input
            type="text"
            placeholder="Filtrează după categorie..."
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ ...inputStyle, paddingLeft: "34px" }}
          />
          </div>
        </div>
      )}

      <div className="booklist-grid">
        {cartiFiltrate.map((carte) => (
          <div
            key={carte.id}
            className="book-card"
            onClick={() => handleCardClick(carte)}
          >
             <h3 className="book-title">
  <FaBook style={{ marginRight: "6px", color: "##000000" }} />
  {carte.titlu}
</h3>

            <p className="book-author"><FaUser style={{ marginRight: "6px" }} />{carte.autor}</p>
<p className="book-category"><FaTags style={{ marginRight: "6px" }} />{carte.categorie}</p>
<p className="book-status">
  {carte.disponibil ? (
    <span style={{ color: "green" }}>
      <FaCheckCircle style={{ marginRight: "6px" }} />Disponibil
    </span>
  ) : (
    <span style={{ color: "red" }}>
      <FaTimesCircle style={{ marginRight: "6px" }} />Indisponibil
    </span>
  )}
</p>


            {carte.disponibil ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  imprumutaCarte(carte.id);
                }}
                style={imprumutaBtnStyle}
              >
                Împrumută
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  returneazaCarte(carte.id);
                }}
                style={returneazaBtnStyle}
              >
                Returnează
              </button>
            )}
          </div>
        ))}
      </div>

      {carteSelectata && (
  <div style={overlayStyle} onClick={inchideModal}>
    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
      <h2 style={{ textAlign: "center", color: "#1e40af", marginBottom: "10px" }}>
        {carteSelectata.titlu}
      </h2>
      <hr style={{ width: "50px", margin: "10px auto", borderColor: "#2563eb" }} />

      <p><FaUser style={{ marginRight: "6px" }} /><strong>Autor:</strong> {carteSelectata.autor}</p>
      <p><FaTags style={{ marginRight: "6px" }} /><strong>Categorie:</strong> {carteSelectata.categorie}</p>
      <p>
        <FaCheckCircle style={{ marginRight: "6px", color: carteSelectata.disponibil ? "green" : "red" }} />
        <strong>Disponibil:</strong> {carteSelectata.disponibil ? "Da" : "Nu"}
      </p>

      {detaliiCarte && (
        <>
          <p><FaBookOpen style={{ marginRight: "6px" }} /><strong>Gen:</strong> {detaliiCarte.gen}</p>
          <p><FaCalendarAlt style={{ marginRight: "6px" }} /><strong>An publicare:</strong> {detaliiCarte.anPublicare}</p>
          <p style={{ marginTop: "10px" }}>
            <FaAlignLeft style={{ marginRight: "6px" }} /><strong>Descriere:</strong> {detaliiCarte.descriere}
          </p>
        </>
      )}

      <button
        onClick={inchideModal}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1e3a8a"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
      >
        Închide
      </button>
    </div>
  </div>
)}

    </div>
  );
}

const inputStyle = {
  padding: "10px",
  width: "300px",
  marginRight: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const imprumutaBtnStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const returneazaBtnStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#f97316",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "450px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  animation: "fadeIn 0.4s ease"

};

const closeBtnStyle = {
  marginTop: "20px",
  padding: "8px 16px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default BookList;











