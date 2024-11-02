import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <img
          src={`${process.env.PUBLIC_URL}/profile.jpg`}
          alt='Logo'
          className='logo'
        />
        <div className='name'>
          <Link to="/" className="name-link">
            <span>Marcos Lutterbach</span>
          </Link>
          <span className='role'>Ruby Developer</span>
        </div>
      </div>
      <div className='navbar-right'>
        <div className={`menu-items ${isOpen ? 'open' : ''}`}>
          <Link to="/resume" className="menu-item" onClick={closeMenu}>Resume</Link>
          <span>|</span>
          <Link to="/projects" className="menu-item" onClick={closeMenu}>Projects</Link>
          <span>|</span>
          <Link to="/articles" className="menu-item" onClick={closeMenu}>Blog</Link>
          <span>|</span>
          <Link to="/contact" className="menu-item" onClick={closeMenu}>Contact</Link>
        </div>
        {!isOpen && (
          <button className='hamburger' onClick={toggleMenu}>
            <GiHamburgerMenu />
          </button>
        )}
      </div>
      {isOpen && (
        <div className='mobile-menu'>
          <button className='close-button' onClick={closeMenu}>✖</button>
          <Link to='/resume' className="mobile-menu-item" onClick={closeMenu}>Resume</Link>
          <Link to="/projects" className="mobile-menu-item" onClick={closeMenu}>Projects</Link>
          <Link to="/articles" className="mobile-menu-item" onClick={closeMenu}>Blog</Link>
          <Link to="/contact" className="mobile-menu-item" onClick={closeMenu}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
