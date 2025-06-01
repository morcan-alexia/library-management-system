import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p style={titleStyle}>Bookly – biblioteca ta digitală</p>
        <p style={descStyle}>Susținem lectura, conectăm cititorii și bibliotecarii.</p>

        <p style={contactItem}>
  <strong>Email :</strong> contact@bookly.ro / <strong>Telefon:</strong> 0723 456 789
</p>

        <p style={contactItem}><strong>Adresă:</strong> Str. Cărților nr. 12, Cluj-Napoca</p>
      </div>

      <p style={bottomStyle}>
        © {new Date().getFullYear()} Bookly. Toate drepturile rezervate.
      </p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#e2e8f0',
  color: '#00000',
  padding: '16px 40px 12px 40px',
  fontSize: '0.85rem',
  borderTop: '1px solid #cbd5e1',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.04)',
};

const contentStyle = {
  textAlign: 'left',
  lineHeight: '1.5',
  maxWidth: '100%',
};

const titleStyle = {
  fontSize: '0.8rem',
  fontWeight: '600',
  margin: '0 0 2px 0',
};

const descStyle = {
  fontSize: '0.7rem',
  margin: '0 0 12px 0',
  opacity: 0.85,
};

const contactItem = {
  margin: '0 0 4px 0',
  fontSize: '0.8rem',
};

const bottomStyle = {
  marginTop: '14px',
  fontSize: '0.75rem',
  textAlign: 'center',
  color: '#475569',
};

export default Footer;




