import React from 'react';
import './Home.css';
import backgroundImage from '../assets/background-library.jpg';
import { FaBook } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="home-content">
        <h2><FaBook style={{ marginRight: '8px' }} />Bine ai venit la Bookly!</h2>
        <hr className="divider" />
        <p>
          Bookly este o aplicație modernă pentru gestionarea eficientă a cărților dintr-o bibliotecă.
          Utilizatorii se pot autentifica, pot vizualiza lista de cărți disponibile, pot împrumuta sau returna cărți,
          în timp ce bibliotecarii au acces la funcții de administrare completă.
        </p>
      </div>
    </div>
  );
};

export default Home;

