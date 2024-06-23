import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Navbar.css';

const Navbar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
    window.location.reload(); // Force page refresh after logging out
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Athletics Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/participants">Participants</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/disciplines">Disciplines</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/results">Results</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {auth.isLoggedIn() ? (
              <li className="nav-item">
                <span className="nav-link" onClick={handleLogout}>Logout</span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
