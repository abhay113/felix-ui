import React, { useState, useEffect } from 'react';
import {
  ChevronRight, Shield, Zap, Users, Globe, ArrowRight, Check, Star, Menu, X,
  TrendingUp, TrendingDown, Wallet, History, ShoppingCart, DollarSign,
  Monitor, Plus, Minus, ArrowUpRight, ArrowDownRight, Eye, EyeOff, Server,
  Cloud, Database, Code, Smartphone, Laptop, Wifi, HardDrive, UserPlus
} from 'lucide-react';
import { keycloak } from '../keycloak.ts';

import { useLocation } from 'react-router-dom';

const Dashboard = ({ username }) => {

  console.log("usernameusernameusernameusername", username);

  const mockUser = {
    name: 'John Doe',
    balance: {
      USD: 25000.50,
      credits: 150,
      licenses: 8,
      support_hours: 24
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedService, setSelectedService] = useState('WEB_DEV');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false); // New state for dialog

  // Mock IT services data
  const itServices = [
    {
      id: 'WEB_DEV',
      name: 'Web Development',
      price: 2500.00,
      change: 5.2,
      icon: <Code className="w-6 h-6" />,
      unit: 'project',
      description: 'Custom web application development'
    },
    {
      id: 'CLOUD_HOST',
      name: 'Cloud Hosting',
      price: 150.00,
      change: -2.1,
      icon: <Cloud className="w-6 h-6" />,
      unit: 'month',
      description: 'Managed cloud hosting services'
    },
    {
      id: 'DB_DESIGN',
      name: 'Database Design',
      price: 1200.00,
      change: 8.7,
      icon: <Database className="w-6 h-6" />,
      unit: 'project',
      description: 'Database architecture and optimization'
    },
    {
      id: 'MOBILE_APP',
      name: 'Mobile App Dev',
      price: 3500.00,
      change: 12.3,
      icon: <Smartphone className="w-6 h-6" />,
      unit: 'project',
      description: 'iOS and Android app development'
    },
    {
      id: 'IT_SUPPORT',
      name: 'IT Support',
      price: 85.00,
      change: 3.1,
      icon: <Monitor className="w-6 h-6" />,
      unit: 'hour',
      description: '24/7 technical support services'
    },
    {
      id: 'SERVER_MAINT',
      name: 'Server Maintenance',
      price: 300.00,
      change: -1.5,
      icon: <Server className="w-6 h-6" />,
      unit: 'month',
      description: 'Server monitoring and maintenance'
    }
  ];

  // Mock order history
  const orderHistory = [
    { id: 1, type: 'buy', service: 'WEB_DEV', quantity: 1, price: 2500, date: '2025-01-15T10:30:00Z', status: 'completed' },
    { id: 2, type: 'sell', service: 'CLOUD_HOST', quantity: 3, price: 150, date: '2025-01-14T15:45:00Z', status: 'completed' },
    { id: 3, type: 'buy', service: 'IT_SUPPORT', quantity: 20, price: 85, date: '2025-01-13T09:20:00Z', status: 'completed' },
    { id: 4, type: 'sell', service: 'DB_DESIGN', quantity: 1, price: 1200, date: '2025-01-12T14:10:00Z', status: 'pending' },
  ];

  // Mock Users data
 const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice.s@example.com', role: 'Admin', status: 'Active', created_at: '2024-01-10T10:00:00Z' },
  { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', role: 'Editor', status: 'Active', created_at: '2024-02-15T14:30:00Z' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Viewer', status: 'Inactive', created_at: '2024-03-20T08:45:00Z' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Admin', status: 'Active', created_at: '2024-04-05T11:00:00Z' },
];;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Military-grade security protocols and compliance standards ensure your business data remains protected."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized infrastructure and cutting-edge technology deliver exceptional performance and reliability."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Team",
      description: "Dedicated team of certified professionals with extensive experience in enterprise IT solutions."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Worldwide service delivery with local support teams and 24/7 availability across time zones."
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "< 2hrs", label: "Response Time" },
    { value: "500+", label: "Clients Served" },
    { value: "24/7", label: "Support" }
  ];

  const NavigationItem = ({ id, icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-600/20 hover:text-blue-800' // Changed text and hover color for light background
        }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const AccountSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Account</h2> {/* Changed text color */}
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors" // Changed text and hover color
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showBalance ? 'Hide' : 'Show'} Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl p-6 border border-gray-200"> {/* Changed background and border */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Account Balance</h3> {/* Changed text color */}
            <DollarSign className="w-6 h-6 text-green-600" /> {/* Adjusted color for contrast */}
          </div>
          <div className="text-3xl font-bold text-gray-900"> {/* Changed text color */}
            {showBalance ? `$${mockUser.balance.USD.toLocaleString()}` : '••••••'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200"> {/* Changed background and border */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Service Credits</h3> {/* Changed text color */}
            <Monitor className="w-6 h-6 text-blue-600" /> {/* Adjusted color for contrast */}
          </div>
          <div className="text-2xl font-bold text-gray-900"> {/* Changed text color */}
            {showBalance ? mockUser.balance.credits : '••••'}
          </div>
          <div className="text-sm text-gray-500">Available Credits</div> {/* Changed text color */}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200"> {/* Changed background and border */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Active Licenses</h3> {/* Changed text color */}
            <Shield className="w-6 h-6 text-purple-600" /> {/* Adjusted color for contrast */}
          </div>
          <div className="text-2xl font-bold text-gray-900"> {/* Changed text color */}
            {showBalance ? mockUser.balance.licenses : '••••'}
          </div>
          <div className="text-sm text-gray-500">Software Licenses</div> {/* Changed text color */}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200"> {/* Changed background and border */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Support Hours</h3> {/* Changed text color */}
            <Users className="w-6 h-6 text-orange-600" /> {/* Adjusted color for contrast */}
          </div>
          <div className="text-2xl font-bold text-gray-900"> {/* Changed text color */}
            {showBalance ? mockUser.balance.support_hours : '••••'}
          </div>
          <div className="text-sm text-gray-500">Remaining Hours</div> {/* Changed text color */}
        </div>
      </div>
    </div>
  );

  const ServiceSection = ({ type }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{type === 'buy' ? 'Purchase Services' : 'Sell Services'}</h2> {/* Changed text color */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200"> {/* Changed background and border */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Catalog</h3> {/* Changed text color */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {itServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"> {/* Changed background and hover */}
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">{service.icon}</div> {/* Adjusted color for contrast */}
                  <div>
                    <div className="font-semibold text-gray-900">{service.name}</div> {/* Changed text color */}
                    <div className="text-sm text-gray-600">{service.description}</div> {/* Changed text color */}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${service.price.toLocaleString()}</div> {/* Changed text color */}
                  <div className="text-xs text-gray-500">per {service.unit}</div> {/* Changed text color */}
                  <div className={`text-sm flex items-center ${service.change >= 0 ? 'text-green-600' : 'text-red-600'}`}> {/* Adjusted color for contrast */}
                    {service.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {Math.abs(service.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200"> {/* Changed background and border */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{type === 'buy' ? 'Place Order' : 'List Service'}</h3> {/* Changed text color */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label> {/* Changed text color */}
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" // Changed background, border, and text color
              >
                {itServices.map((service) => (
                  <option key={service.id} value={service.id} className="bg-gray-100"> {/* Changed background */}
                    {service.name} - ${service.price}/{service.unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"> {/* Changed text color */}
                Quantity ({itServices.find(s => s.id === selectedService)?.unit || 'units'})
              </label>
              <input
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" // Changed background, border, and text color
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4"> {/* Changed background */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Service:</span> {/* Changed text color */}
                <span className="text-gray-900 font-medium"> {/* Changed text color */}
                  {itServices.find(s => s.id === selectedService)?.name || 'Select Service'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Unit Price:</span> {/* Changed text color */}
                <span className="text-gray-900 font-medium"> {/* Changed text color */}
                  ${itServices.find(s => s.id === selectedService)?.price.toLocaleString() || '0.00'}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2"> {/* Changed border */}
                <span className="text-gray-700">Total Cost:</span> {/* Changed text color */}
                <span className="text-xl font-bold text-gray-900"> {/* Changed text color */}
                  ${orderQuantity && selectedService ? (
                    parseFloat(orderQuantity) * (itServices.find(s => s.id === selectedService)?.price || 0)
                  ).toLocaleString() : '0.00'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (orderQuantity && selectedService) {
                  const service = itServices.find(s => s.id === selectedService);
                  alert(`${type === 'buy' ? 'Order placed' : 'Service listed'} for ${orderQuantity} ${service?.unit}(s) of ${service?.name}`);
                  setOrderQuantity('');
                }
              }}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${type === 'buy'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {type === 'buy' ? 'Place Order' : 'List Service'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderHistorySection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Order History</h2> {/* Changed text color */}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden"> {/* Changed background and border */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100"> {/* Changed background */}
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Service</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Quantity</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th> {/* Changed text color */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200"> {/* Changed divider */}
              {orderHistory.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors"> {/* Changed hover background */}
                  <td className="px-6 py-4 text-sm text-gray-700"> {/* Changed text color */}
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.type === 'buy'
                      ? 'bg-green-100 text-green-700' // Adjusted color for contrast
                      : 'bg-blue-100 text-blue-700' // Adjusted color for contrast
                      }`}>
                      {order.type === 'buy' ? <ShoppingCart className="w-3 h-3 mr-1" /> : <DollarSign className="w-3 h-3 mr-1" />}
                      {order.type === 'buy' ? 'PURCHASE' : 'SALE'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900"> {/* Changed text color */}
                    {itServices.find(s => s.id === order.service)?.name || order.service}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td> {/* Changed text color */}
                  <td className="px-6 py-4 text-sm text-gray-700">${order.price.toLocaleString()}</td> {/* Changed text color */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed'
                      ? 'bg-green-100 text-green-700' // Adjusted color for contrast
                      : 'bg-yellow-100 text-yellow-700' // Adjusted color for contrast
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // New User Management Section
  const UserManagementSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2> {/* Changed text color */}
        <button
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden"> {/* Changed background and border */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100"> {/* Changed background */}
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User id</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User name</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th> {/* Changed text color */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created at</th> {/* Changed text color */}
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200"> {/* Changed divider */}
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors"> {/* Changed hover background */}
                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td> {/* Changed text color */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td> {/* Changed text color */}
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td> {/* Changed text color */}
                  <td className="px-6 py-4 text-sm text-gray-700">{user.created_at}</td> {/* Changed text color */}
{/* \                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.created_at === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddUserDialogOpen && <AddUserDialog onClose={() => setIsAddUserDialogOpen(false)} />}
    </div>
  );

  // Add User Dialog Component
  const AddUserDialog = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Viewer');

    const handleSubmit = (e) => {
      e.preventDefault();
      // In a real application, you'd send this data to your backend
      console.log('New User:', { name, email, role });
      alert(`User "${name}" added! (Mock action)`);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md border border-gray-200 relative"> {/* Changed background and border */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"> {/* Changed text and hover color */}
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2> {/* Changed text color */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label> {/* Changed text color */}
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" // Changed background, border, and text color
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label> {/* Changed text color */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" // Changed background, border, and text color
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label> {/* Changed text color */}
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" // Changed background, border, and text color
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    );
  };


  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSection />;
      case 'buy':
        return <ServiceSection type="buy" />;
      case 'sell':
        return <ServiceSection type="sell" />;
      case 'history':
        return <OrderHistorySection />;
      case 'users': // New case for User Management
        return <UserManagementSection />;
      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-8" style={{ // Changed background and border
                backdropFilter: 'blur(10px)'
              }}>
                <Star className="w-4 h-4 mr-2 text-yellow-600" /> {/* Adjusted color for contrast */}
                <span className="text-sm text-gray-800">Welcome {username} - Premium IT Services</span> {/* Changed text color */}
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gray-900">Internal Blockchain</span> {/* Changed text color */}
                <br />
                <span className="text-blue-600">Service & Wallet</span> {/* Adjusted color for contrast */}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"> {/* Changed text color */}
                Secure, scalable, and lightning-fast blockchain infrastructure designed for enterprise teams.
                Manage digital assets with confidence.
              </p>
            </section>

            {/* Stats Section */}
            <section className="py-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"> {/* Adjusted color for contrast */}
                      {stat.value}
                    </div>
                    <div className="text-gray-700">{stat.label}</div> {/* Changed text color */}
                  </div>
                ))}
              </div>
            </section>

            {/* Features Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Powerful IT Solutions
                </h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto"> {/* Changed text color */}
                  Everything you need to transform your business with cutting-edge technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer" // Changed background and border
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="text-blue-600 mb-4 group-hover:text-purple-600 transition-colors"> {/* Adjusted color for contrast */}
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3> {/* Changed text color */}
                    <p className="text-gray-700 group-hover:text-gray-800 transition-colors"> {/* Changed text color */}
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ // Changed bg-gray-900 to bg-white and text-white to text-gray-900
      background: 'linear-gradient(135deg, #f0f4f8 0%, #dbeafe 50%, #f0f4f8 100%)' // Changed gradient to lighter shades
    }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-30 animate-pulse" style={{ // Changed color and opacity
          top: '-10rem',
          right: '-10rem',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute w-80 h-80 bg-purple-300 rounded-full opacity-30 animate-pulse" style={{ // Changed color and opacity
          bottom: '-10rem',
          left: '-10rem',
          filter: 'blur(40px)',
          animationDelay: '1s'
        }}></div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 min-h-screen p-4 hidden lg:block"> {/* Changed background and border */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-700"> {/* Changed text color */}
              Felix
            </span>
          </div>

          <nav className="space-y-2">
            <NavigationItem
              id="dashboard"
              icon={<TrendingUp className="w-5 h-5" />}
              label="Dashboard"
              isActive={activeSection === 'dashboard'}
              onClick={setActiveSection}
            />
            <NavigationItem
              id="account"
              icon={<Wallet className="w-5 h-5" />}
              label="My Account"
              isActive={activeSection === 'account'}
              onClick={setActiveSection}
            />
            <NavigationItem
              id="buy"
              icon={<ShoppingCart className="w-5 h-5" />}
              label="Purchase Services"
              isActive={activeSection === 'buy'}
              onClick={setActiveSection}
            />
            <NavigationItem
              id="sell"
              icon={<DollarSign className="w-5 h-5" />}
              label="Sell Services"
              isActive={activeSection === 'sell'}
              onClick={setActiveSection}
            />
            <NavigationItem
              id="history"
              icon={<History className="w-5 h-5" />}
              label="Order History"
              isActive={activeSection === 'history'}
              onClick={setActiveSection}
            />
            <NavigationItem
              id="users" // New Navigation Item for Users
              icon={<Users className="w-5 h-5" />}
              label="Users"
              isActive={activeSection === 'users'}
              onClick={setActiveSection}
            />
          </nav>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200"> {/* Changed background and border */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {username?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900"> {/* Changed text color */}
                  {username?.charAt(0).toUpperCase() + username?.slice(1)}
                </div>
                <div className="text-xs text-gray-600">Enterprise Client</div> {/* Changed text color */}
              </div>
            </div>
            <button className="w-full bg-red-100 text-red-700 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors" onClick={() => keycloak.logout()}> {/* Changed background and text color */}
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4"> {/* Changed background and border */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700" // Changed text color
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <span className="text-xl font-bold text-blue-700">Felixs</span> {/* Changed text color */}
              </div>

              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-sm text-gray-700"> {/* Changed text color */}
                  Account Balance: <span className="text-gray-900 font-semibold">${mockUser.balance.USD.toLocaleString()}</span> {/* Changed text color */}
                </div>
              </div>
            </div>
          </nav>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
          <div className="w-64 bg-white h-full p-4"> {/* Changed background */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-blue-700">Felixs</span> {/* Changed text color */}
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-700"> {/* Changed text color */}
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              <NavigationItem
                id="dashboard"
                icon={<TrendingUp className="w-5 h-5" />}
                label="Dashboard"
                isActive={activeSection === 'dashboard'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
              <NavigationItem
                id="account"
                icon={<Wallet className="w-5 h-5" />}
                label="My Account"
                isActive={activeSection === 'account'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
              <NavigationItem
                id="buy"
                icon={<ShoppingCart className="w-5 h-5" />}
                label="Purchase Services"
                isActive={activeSection === 'buy'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
              <NavigationItem
                id="sell"
                icon={<DollarSign className="w-5 h-5" />}
                label="Sell Services"
                isActive={activeSection === 'sell'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
              <NavigationItem
                id="history"
                icon={<History className="w-5 h-5" />}
                label="Order History"
                isActive={activeSection === 'history'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
              <NavigationItem
                id="users"
                icon={<Users className="w-5 h-5" />}
                label="Users"
                isActive={activeSection === 'users'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
            </nav>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200"> {/* Changed background and border */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {username?.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {username?.charAt(0).toUpperCase() + username?.slice(1)}
                  </div>
                  <div className="text-xs text-gray-600">Enterprise Client</div>
                </div>
              </div>
              <button className="w-full bg-red-100 text-red-700 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors" onClick={() => keycloak.logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;