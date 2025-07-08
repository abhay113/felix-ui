import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import './App.css';


const App = ({ keycloak }: { keycloak: any }) => {

  console.log(":LFKFJJFFKFKLFFL",keycloak);
  
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
     

      {/* Routing */}
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard keycloak={keycloak} />} />
        <Route path="*" element={<Dashboard keycloak={keycloak} />} />
      </Routes>
    </div>
  );
};

export default App;
