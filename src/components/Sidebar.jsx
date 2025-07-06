import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaSearch, FaMusic } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', textDecoration: 'none' }}>
        <img
          src="/images/spotify-logo.svg" // ✅ Place this in public/images/
          alt="Spotify Logo"
          style={{ width: '28px', height: '28px', marginRight: '10px' }}
        />
        <h2 style={{ color: '#1DB954', fontSize: '1.2rem' }}>Spotify 2.0</h2>
      </Link>

      <nav>
        <NavLink to="/" className="nav-link">
          <FaHome style={{ marginRight: '10px' }} /> Home
        </NavLink>
        <NavLink to="/search" className="nav-link">
          <FaSearch style={{ marginRight: '10px' }} /> Search
        </NavLink>
        <NavLink to="/genre/pop" className="nav-link">
          <FaMusic style={{ marginRight: '10px' }} /> Genres
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
