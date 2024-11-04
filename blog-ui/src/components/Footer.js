import React from 'react';
import '../styles/Footer.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Email</h4>
        <p>mlutterb@gmail.com</p>
      </div>

      <div className="footer-section">
        <h4>Follow Me</h4>
        <div className="footer-icons">
          <a href="https://www.linkedin.com/in/marcoslutterbach" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/mlutterbach" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="footer-section">
        <p>&copy; 2024 Marcos Lutterbach</p>
      </div>
    </footer>
  );
};

export default Footer;
