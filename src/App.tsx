import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import './App.css';


const App = ({ keycloak }: { keycloak: any }) => {
  const isLoggedIn = keycloak.authenticated;
  const navigate = useNavigate();
  const location = useLocation();

  console.log("keycloak?.tokenParsedkeycloak?.tokenParsed",keycloak?.tokenParsed);
  

  const username = keycloak?.tokenParsed?.given_name;
  console.log("usernameusernameusername",username);
  
   localStorage.setItem('userId', keycloak?.tokenParsed?.sub);
    localStorage.setItem('name', keycloak?.tokenParsed?.preferred_username);

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
