import React, { useEffect, useState } from "react";
import axios from "axios";
import './LoginForm.css';



function LoansList() {
  const [loans, setLoans] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/loans`)
      .then((res) => {
        setLoans(res.data);
        fetchBooksForLoans(res.data);
      })
      .catch((err) => console.error("Eroare la preluarea împrumuturilor:", err));
  }, []);

  const fetchBooksForLoans = async (loansList) => {
    const uniqueBookIds = [...new Set(loansList.map((loan) => loan.idBook))];
    const newBookInfo = {};

    for (let id of uniqueBookIds) {
      try {
        const res = await axios.get(`${API_URL}/books/${id}`);
        newBookInfo[id] = res.data;
      } catch (err) {
        console.error(`Eroare la preluarea cărții cu ID ${id}:`, err);
      }
    }
    setBookInfo(newBookInfo);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1f2937" }}>
        Lista Împrumuturi
      </h2>
  
      <div style={{ overflowX: "auto", maxWidth: "1000px", margin: "0 auto" }}>

        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "12px" }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>ID Client</th>
              <th style={thStyle}>Titlu Carte</th>
              <th style={thStyle}>Autor</th>
              <th style={thStyle}>Data Împrumut</th>
              <th style={thStyle}>Data Returnare</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td style={tdStyle}>{loan.id}</td>
                <td style={tdStyle}>{loan.idClient}</td>
                <td style={tdStyle}>{bookInfo[loan.idBook]?.titlu || loan.idBook}</td>
                <td style={tdStyle}>{bookInfo[loan.idBook]?.autor || "-"}</td>
                <td style={tdStyle}>{new Date(loan.dataImprumut).toLocaleDateString()}</td>
                <td style={tdStyle}>{loan.dataReturnare ? new Date(loan.dataReturnare).toLocaleDateString() : "Nereturnată"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "10px",
  backgroundColor: "#f1f5f9",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default LoansList;