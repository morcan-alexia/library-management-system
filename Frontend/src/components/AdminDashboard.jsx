import React, { useEffect, useState } from "react";
import axios from "axios";
import BookDetailsForm from "./BookDetailsForm";

function AdminDashboard({ showAddFormOnly = false }) {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    titlu: "",
    autor: "",
    categorie: "",
    disponibil: true,
    descriere: "",
    anPublicare: "",
    gen: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editingBook, setEditingBook] = useState({});
  const [selectedBookId, setSelectedBookId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!showAddFormOnly) fetchBooks();
  }, [showAddFormOnly]);

  const fetchBooks = () => {
    axios.get(`${API_URL}/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Eroare la preluarea cărților:", err));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const bookRes = await axios.post(`${API_URL}/books`, {
        titlu: newBook.titlu,
        autor: newBook.autor,
        categorie: newBook.categorie,
        disponibil: newBook.disponibil
      });
      const bookId = bookRes.data.id;

      await axios.post(`${API_URL}/bookdetails`, {
        id: bookId,
        descriere: newBook.descriere,
        anPublicare: newBook.anPublicare,
        gen: newBook.gen
      });

      alert("Carte și detalii adăugate.");
      setNewBook({ titlu: "", autor: "", categorie: "", disponibil: true, descriere: "", anPublicare: "", gen: "" });
      fetchBooks();
    } catch (err) {
      console.error("Eroare adăugare carte și detalii:", err);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm("Ștergi această carte?")) {
      try {
        // întâi ștergi detaliile, apoi cartea
        await axios.delete(`${API_URL}/bookdetails/${id}`);
        await axios.delete(`${API_URL}/books/${id}`);
        alert("Carte și detalii șterse cu succes.");
        fetchBooks(); // reîncarcă lista
      } catch (err) {
        console.error("Eroare la ștergerea cărții:", err);
        alert("A apărut o eroare la ștergere.");
      }
    }
  };
  
  const startEditing = async (book) => {
    try {
      const res = await axios.get(`${API_URL}/bookdetails/${book.id}`);
      setEditingBook({ ...book, ...res.data });
      setEditingId(book.id);
    } catch (err) {
      console.error("Eroare la încărcarea detaliilor:", err);
      setEditingBook(book);
    }
  };
  

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const saveEdit = async () => {
    console.log("saveEdit a fost apelat"); // <-- acest log ne arată dacă intrăm în funcție
  
    try {
      console.log("Trimitem:", editingBook); // vezi ce date trimitem
  
      await axios.put(`${API_URL}/books/${editingId}`, {
        id: editingId,
        titlu: editingBook.titlu,
        autor: editingBook.autor,
        categorie: editingBook.categorie,
        disponibil: editingBook.disponibil
      });
  
      await axios.put(`${API_URL}/bookdetails/${editingId}`, {
        id: editingId,
        descriere: editingBook.descriere,
        gen: editingBook.gen,
        anPublicare: editingBook.anPublicare
      });
  
      alert("Cartea și detaliile au fost actualizate.");
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error("Eroare la salvarea modificărilor:", err);
    }
  };
  
  
  
  

  if (showAddFormOnly) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h3>Adaugă carte nouă</h3>
        <form onSubmit={handleAddBook}>
          <input name="titlu" placeholder="Titlu" value={newBook.titlu} onChange={handleChange} required style={inputStyle} />
          <input name="autor" placeholder="Autor" value={newBook.autor} onChange={handleChange} required style={inputStyle} />
          <input name="categorie" placeholder="Categorie" value={newBook.categorie} onChange={handleChange} required style={inputStyle} />
          <input name="gen" placeholder="Gen" value={newBook.gen} onChange={handleChange} style={inputStyle} />
          <input name="anPublicare" type="number" placeholder="An publicare" value={newBook.anPublicare} onChange={handleChange} style={inputStyle} />
          <textarea name="descriere" placeholder="Descriere" value={newBook.descriere} onChange={handleChange} rows={3} style={{ ...inputStyle, height: "80px" }} />
          <label>
            <input type="checkbox" name="disponibil" checked={newBook.disponibil} onChange={handleChange} /> Disponibil
          </label>
          <br />
          <button type="submit" style={buttonStyle}>Adaugă</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Panou Bibliotecar – Cărți</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Titlu</th>
            <th style={thStyle}>Autor</th>
            <th style={thStyle}>Categorie</th>
            <th style={thStyle}>Disponibil</th>
            <th style={thStyle}>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              {editingId === book.id ? (
                <>
                 <td colSpan="5">
  <input name="titlu" value={editingBook.titlu} onChange={handleEditChange} style={inputStyle} />
  <input name="autor" value={editingBook.autor} onChange={handleEditChange} style={inputStyle} />
  <input name="categorie" value={editingBook.categorie} onChange={handleEditChange} style={inputStyle} />
  <input name="gen" value={editingBook.gen} onChange={handleEditChange} style={inputStyle} />
  <input name="anPublicare" type="number" value={editingBook.anPublicare || ""} onChange={handleEditChange} style={inputStyle} />
  <textarea name="descriere" value={editingBook.descriere || ""} onChange={handleEditChange} style={inputStyle} rows={2} />
  <label>
    <input type="checkbox" name="disponibil" checked={editingBook.disponibil} onChange={handleEditChange} />
    Disponibil
  </label>
  <br />
  <button onClick={saveEdit} style={buttonStyle}>Salvează</button>
  <button onClick={() => setEditingId(null)} style={{ ...buttonStyle, backgroundColor: "#aaa", marginLeft: "5px" }}>Anulează</button>
</td>

                </>
              ) : (
                <>
                  <td style={tdStyle}>{book.titlu}</td>
                  <td style={tdStyle}>{book.autor}</td>
                  <td style={tdStyle}>{book.categorie}</td>
                  <td style={tdStyle}>{book.disponibil ? "Da" : "Nu"}</td>
                  <td style={tdStyle}>
                    <button onClick={() => startEditing(book)} style={buttonStyle}>Editează</button>
                    <button onClick={() => deleteBook(book.id)} style={{ ...buttonStyle, backgroundColor: "#dc2626", marginLeft: "5px" }}>Șterge</button>
                    
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBookId && (
        <BookDetailsForm
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "6px",
  marginBottom: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "10px",
  backgroundColor: "#f1f5f9"
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "10px",
  textAlign: "center"
};

const buttonStyle = {
  padding: "6px 10px",
  backgroundColor: "#B7372F",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default AdminDashboard;

