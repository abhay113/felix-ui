import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import './App.css';


const App = ({ keycloak }: { keycloak: any }) => {
  const isLoggedIn = keycloak.authenticated;
  const navigate = useNavigate();
  const location = useLocation();

  console.log("keycloak?.tokenParsedkeycloak?.tokenParsed", keycloak.tokenParsed);


  const username = keycloak?.tokenParsed?.given_name;
  console.log("usernameusernameusername", username);
  localStorage.setItem('token', keycloak.token);
  const group = keycloak?.tokenParsed?.group
 if (group && Array.isArray(group)) {
    try {
      localStorage.setItem('userGroup', JSON.stringify(group));
      console.log('Full group array stored in localStorage:', group);

      // Extract and store the primary group name (e.g., "admin" from "/admin")
      if (group.length > 0) {
        const fullGroupName = group[0];
        const groupName = fullGroupName.startsWith('/') ? fullGroupName.substring(1) : fullGroupName;
        localStorage.setItem('groupName', groupName);
        console.log('Extracted primary group name stored in localStorage:', groupName);
      }
    } catch (e) {
      console.error('Error storing group in localStorage:', e);
    }
  } else {
    console.warn('Group not found or not an array in keycloak.tokenParsed');
  }
  
  localStorage.setItem('kc_userId', keycloak?.tokenParsed?.sub);
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
          element={<Dashboard username={username} />}
        />
        <Route
          path="*"
          element={<Dashboard username={username} />}
        />
      </Routes>
    </div>
  );
};


export default App;
