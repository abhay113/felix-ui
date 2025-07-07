import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import './App.css';


const App = ({ keycloak }: { keycloak: any }) => {
  const isLoggedIn = keycloak.authenticated;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ['/login', '/signup'];
    const username = keycloak?.tokenParsed?.preferred_username;

    if (!username && !publicPaths.includes(location.pathname)) {
      keycloak.login();
    }
  }, [keycloak, location.pathname]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left" onClick={() => navigate('/')}>Felix</div>
         <div className="navbar-right">
      {isLoggedIn ? (
        <div className="user-menu">
          <div className="user-icon-container">
            <div className="user-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
              </svg>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-item username">
                {keycloak.tokenParsed?.preferred_username}
              </div>
              <button className="dropdown-item logout-button" onClick={() => keycloak.logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className="nav-button" onClick={() => keycloak.login()}>
          Login
        </button>
      )}
    </div>
      </nav>

      {/* Routing */}
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard keycloak={keycloak} />} />
        <Route path="*" element={<Dashboard keycloak={keycloak} />} />
      </Routes>
    </div>
  );
};

export default App;
