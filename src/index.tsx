import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { keycloak, initKeycloak } from './keycloak.ts';
import './index.css';
import { ClipLoader } from 'react-spinners'; // Import a spinner component

const Root = () => {
  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {
    initKeycloak()
      .then(() => setKeycloakReady(true))
      .catch(err => console.error('Keycloak Init Error:', err));
  }, []);

  if (!keycloakReady) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
        <ClipLoader color="#36D7B7" loading={true} size={50} /> {/* Example spinner */}
        <div>Loading ...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <App keycloak={keycloak} />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Root />);