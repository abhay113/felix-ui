import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import './App.css';


const App = ({ keycloak }: { keycloak: any }) => {
  const isLoggedIn = keycloak.authenticated;
  const navigate = useNavigate();
  const location = useLocation();

  const username = keycloak?.tokenParsed?.given_name;

  useEffect(() => {
    const publicPaths = ['/login', '/signup'];
    if (!username && !publicPaths.includes(location.pathname)) {
      keycloak.login();
    }
  }, [keycloak, location.pathname, username]);

  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard  username={username} />}
        />
        <Route
          path="*"
          element={<Dashboard  username={username}  />}
        />
      </Routes>
    </div>
  );
};


export default App;
