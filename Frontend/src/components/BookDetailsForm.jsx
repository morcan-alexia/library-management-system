import React, { useEffect, useState } from "react";
import axios from "axios";

function BookDetailsForm({ bookId, onClose }) {
  const [details, setDetails] = useState({
    id: bookId,
    gen: "",
    anPublicare: "",
    descriere: ""
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/bookdetails/${bookId}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // dacă nu există detalii, mergem pe varianta de adăugare
        setLoading(false);
      });
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const method = details.gen || details.anPublicare || details.descriere ? "put" : "post";
    const url = `${API_URL}/bookdetails${method === "put" ? `/${bookId}` : ""}`;

    axios[method](url, details)
      .then(() => {
        alert("Detaliile au fost salvate.");
        onClose();
      })
      .catch((err) => {
        console.error("Eroare la salvare:", err);
        alert("A apărut o eroare la salvare.");
      });
  };

  if (loading) return <p>Se încarcă detaliile...</p>;

  return (
    <div style={modalStyle}>
      <h3>Detalii carte (ID: {bookId})</h3>
      <input
        type="text"
        name="gen"
        placeholder="Gen"
        value={details.gen}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="anPublicare"
        placeholder="An publicare"
        value={details.anPublicare || ""}
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="descriere"
        placeholder="Descriere"
        value={details.descriere}
        onChange={handleChange}
        rows={4}
        style={{ ...inputStyle, height: "100px" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSave} style={buttonStyle}>Salvează</button>
        <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: "#aaa", marginLeft: "10px" }}>Anulează</button>
      </div>
    </div>
  );
}

const modalStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  maxWidth: "400px",
  margin: "20px auto"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "8px 0",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default BookDetailsForm;
