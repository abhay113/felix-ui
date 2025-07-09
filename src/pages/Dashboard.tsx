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
        : 'text-gray-300 hover:bg-blue-600/20 hover:text-white'
        }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const AccountSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Account</h2>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showBalance ? 'Hide' : 'Show'} Details</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Account Balance</h3>
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {showBalance ? `$${mockUser.balance.USD.toLocaleString()}` : '••••••'}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Service Credits</h3>
            <Monitor className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {showBalance ? mockUser.balance.credits : '••••'}
          </div>
          <div className="text-sm text-gray-400">Available Credits</div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Active Licenses</h3>
            <Shield className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {showBalance ? mockUser.balance.licenses : '••••'}
          </div>
          <div className="text-sm text-gray-400">Software Licenses</div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Support Hours</h3>
            <Users className="w-6 h-6 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {showBalance ? mockUser.balance.support_hours : '••••'}
          </div>
          <div className="text-sm text-gray-400">Remaining Hours</div>
        </div>
      </div>
    </div>
  );

  const ServiceSection = ({ type }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{type === 'buy' ? 'Purchase Services' : 'Sell Services'}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Service Catalog</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {itServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400">{service.icon}</div>
                  <div>
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-sm text-gray-400">{service.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${service.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">per {service.unit}</div>
                  <div className={`text-sm flex items-center ${service.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {service.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {Math.abs(service.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">{type === 'buy' ? 'Place Order' : 'List Service'}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {itServices.map((service) => (
                  <option key={service.id} value={service.id} className="bg-gray-800">
                    {service.name} - ${service.price}/{service.unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quantity ({itServices.find(s => s.id === selectedService)?.unit || 'units'})
              </label>
              <input
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Service:</span>
                <span className="text-white font-medium">
                  {itServices.find(s => s.id === selectedService)?.name || 'Select Service'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Unit Price:</span>
                <span className="text-white font-medium">
                  ${itServices.find(s => s.id === selectedService)?.price.toLocaleString() || '0.00'}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-2">
                <span className="text-gray-300">Total Cost:</span>
                <span className="text-xl font-bold text-white">
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
      <h2 className="text-2xl font-bold">Order History</h2>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orderHistory.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.type === 'buy'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-blue-600/20 text-blue-400'
                      }`}>
                      {order.type === 'buy' ? <ShoppingCart className="w-3 h-3 mr-1" /> : <DollarSign className="w-3 h-3 mr-1" />}
                      {order.type === 'buy' ? 'PURCHASE' : 'SALE'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {itServices.find(s => s.id === order.service)?.name || order.service}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{order.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">${order.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-yellow-600/20 text-yellow-400'
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
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">User id</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">User name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Created at</th>
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-4 text-sm font-medium text-white">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td> 
                  <td className="px-6 py-4 text-sm text-gray-300">{user.created_at}</td>
{/* \                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.created_at === 'Active'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-red-600/20 text-red-400'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
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
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md border border-white/10 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-white">Add New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 rounded-full border border-white border-opacity-20 mb-8" style={{
                backdropFilter: 'blur(10px)'
              }}>
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">Welcome {username} - Premium IT Services</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-white">Internal Blockchain</span>
                <br />
                <span className="text-purple-400">Service & Wallet</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Secure, scalable, and lightning-fast blockchain infrastructure designed for enterprise teams.
                Manage digital assets with confidence.
              </p>
            </section>

            {/* Stats Section */}
            <section className="py-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
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
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Everything you need to transform your business with cutting-edge technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="text-blue-400 mb-4 group-hover:text-purple-400 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
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
    <div className="min-h-screen bg-gray-900 text-white" style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #1e293b 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{
          top: '-10rem',
          right: '-10rem',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse" style={{
          bottom: '-10rem',
          left: '-10rem',
          filter: 'blur(40px)',
          animationDelay: '1s'
        }}></div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 min-h-screen p-4 hidden lg:block">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-400">
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

          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {username?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {username?.charAt(0).toUpperCase() + username?.slice(1)}
                </div>
                <div className="text-xs text-gray-400">Enterprise Client</div>
              </div>
            </div>
            <button className="w-full bg-red-600/20 text-red-400 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors" onClick={() => keycloak.logout()}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Navigation */}
          <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <span className="text-xl font-bold text-blue-400">Felixs</span>
              </div>

              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-sm text-gray-400">
                  Account Balance: <span className="text-white font-semibold">${mockUser.balance.USD.toLocaleString()}</span>
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
          <div className="w-64 bg-black/90 h-full p-4">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-blue-400">Felixs</span>
              <button onClick={() => setIsMenuOpen(false)}>
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
                label="Transaction History"
                isActive={activeSection === 'history'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
              <NavigationItem
                id="users" // New Navigation Item for Users in mobile menu
                icon={<Users className="w-5 h-5" />}
                label="Users"
                isActive={activeSection === 'users'}
                onClick={(id) => {
                  setActiveSection(id);
                  setIsMenuOpen(false);
                }}
              />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;