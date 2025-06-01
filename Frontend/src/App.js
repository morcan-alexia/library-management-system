import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import BookList from "./components/BookList";
import LibrarianLogin from "./components/LibrarianLogin";
import LibrarianRegisterForm from "./components/LibrarianRegisterForm";
import LibrarianDashboard from "./components/LibrarianDashboard";
import Navbar from "./components/Navbar";
import background from "./assets/background.jpg";
import { GiBookshelf } from 'react-icons/gi';
import './App.css';
import Footer from "./components/Footer";

import Home from './components/Home';

function App() {

  const [currentView, setCurrentView] = useState("home");
  const [showRegister, setShowRegister] = useState(false);
  const [showLibrarianRegister, setShowLibrarianRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [librarian, setLibrarian] = useState(null);

  useEffect(() => {
    const handleSwitchToRegister = () => setShowRegister(true);
    const handleSwitchToLogin = () => setShowRegister(false);
  
    window.addEventListener("switchToRegister", handleSwitchToRegister);
    window.addEventListener("switchToLogin", handleSwitchToLogin);
  
    return () => {
      window.removeEventListener("switchToRegister", handleSwitchToRegister);
      window.removeEventListener("switchToLogin", handleSwitchToLogin);
    };
  }, []);
  useEffect(() => {
    const handleSwitchToLibrarianRegister = () => setShowLibrarianRegister(true);
    const handleSwitchToLibrarianLogin = () => setShowLibrarianRegister(false);
  
    window.addEventListener("switchToLibrarianRegister", handleSwitchToLibrarianRegister);
    window.addEventListener("switchToLibrarianLogin", handleSwitchToLibrarianLogin);
  
    return () => {
      window.removeEventListener("switchToLibrarianRegister", handleSwitchToLibrarianRegister);
      window.removeEventListener("switchToLibrarianLogin", handleSwitchToLibrarianLogin);
    };
  }, []);
  
  
 
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLibrarian(null);
    setCurrentView("home");
  };

  const renderContent = () => {
    if (isAuthenticated) return <BookList searchable />;
    if (librarian) return <LibrarianDashboard onLogout={handleLogout} />;

    switch (currentView) {
      case "login":
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {showRegister ? (
        <RegisterForm onRegister={() => setIsAuthenticated(true)} />
      ) : (
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );

      case "librarian":
        return (
          <div style={null}>
            {showLibrarianRegister ? (
              <>
                <LibrarianRegisterForm
                  onRegister={() => {
                    setShowLibrarianRegister(false);
                    setCurrentView("librarian");
                  }}
                />
               
              </>
            ) : (
              <>
                <LibrarianLogin onLoginLibrarian={(lib) => setLibrarian(lib)} />
                
              </>
            )}
          </div>
        );

        case "home":
          default:
            return (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "20px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  padding: "50px 30px",
                  maxWidth: "700px",
                  margin: "60px auto",
                  textAlign: "center",
                  animation: "fadeIn 1.2s ease",
                }}
              >
                <h2 style={{ fontSize: "2.2rem", marginBottom: "16px" }}>
   Bine ai venit la Bookly!
</h2>

                <hr
                  style={{
                    width: "60px",
                    height: "4px",
                    margin: "16px auto",
                    backgroundColor: "#B7372F",
                    border: "none",
                    borderRadius: "2px",
                  }}
                />
                <p style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                Începe-ți următoarea aventură printre pagini. Cu Bookly, accesul la cărțile preferate e mai simplu ca niciodată.
                </p>
                <p style={{ fontStyle: "italic", color: "#444", marginTop: "20px", marginBottom: "30px" }}>
                  „O carte bună este un prieten pe viață.”
                </p>
               
<div style={{ marginTop: "12px" }}>
<GiBookshelf className="bouncing-icon" />

</div> 
              </div>
            );
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }}>
      <Navbar
        setCurrentView={setCurrentView}
        currentView={currentView}
        isAuthenticated={isAuthenticated}
        isLibrarian={!!librarian}
        handleLogout={handleLogout}
      />
      <div style={{ flex: 1 }}>
    <div style={containerStyle}>{renderContent()}</div>
  </div>

  <Footer />
</div>
  );
}

// Stiluri


const containerStyle = {
  padding: "30px",
  display: "flex",
  justifyContent: "center"
};


const homeStyle = {
  padding: "40px",
  textAlign: "center",
  backgroundColor: "rgba(255,255,255,0.95)",
  borderRadius: "12px"
};

const toggleTextStyle = {
  textAlign: "center",
  marginTop: "12px",
  fontSize: "14px",
  color: "#334155"
};


const linkStyle = {
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "underline"
};

export default App;
































