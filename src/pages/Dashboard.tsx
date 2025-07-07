
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Mock data and interfaces
const mockKeycloak = {
  token: 'mock-token',
  tokenParsed: {
    given_name: 'John'
  }
};
const Dashboard = ({ keycloak = mockKeycloak }) => {
  return (
    <div>welcome</div>
  )
  
};

export default Dashboard;