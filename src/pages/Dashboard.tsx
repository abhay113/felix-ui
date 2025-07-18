import React, { useState, useEffect } from 'react';
import {
  Shield, Zap, Users, Globe, Star, Menu, X,
  TrendingUp, Wallet, History, ShoppingCart, DollarSign,
  Monitor, Eye, EyeOff, Server,
  Cloud, Database, Code, Smartphone, UserPlus, CheckCircle, XCircle,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import { keycloak } from '../keycloak.ts';
import AccountSection from '../components/AccountSection.tsx';
import ServiceSection from '../components/ ServiceSection.tsx';
import OrderHistorySection from '../components/OrderHistorySection.tsx';
import UserManagementSection from '../components/UserManagementSection.tsx';
import EntityManagementSection from '../components/EntityManagementSection.tsx';
import NavigationItem from '../components/NavigationItem.tsx';

const Dashboard = ({ username }) => {
  const [groupName, setGroupName] = useState(null);
  const userName = localStorage.getItem('name');  
  const role = localStorage.getItem('role');
  
  let fetchUsers;

  if (role === "manager") {
    fetchUsers = async () => {
      try {
     const responses = await fetch(`${process.env.REACT_APP_API_URL}/getUser/${userName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!responses.ok) {
          throw new Error(`HTTP error! status: ${responses.status}`);
        }

        const userData = await responses.json();
        localStorage.setItem('userId', userData?.id);
        const userId = localStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API_URL}/getwalletDataofEntity/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('public_key', data?.entities[0]?.wallet.public_key);
        localStorage.setItem('private_key', data?.entities[0]?.wallet.secret_key);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  } else {
    fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getUser/${userName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('public_key', data?.wallet?.public_key);
        localStorage.setItem('private_key', data?.wallet?.secret_key);
        localStorage.setItem('userId', data?.id);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const storedGroupName = localStorage.getItem('groupName');
    if (storedGroupName) {
      setGroupName(storedGroupName);
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

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
      case 'entity':
        return <EntityManagementSection />;
      case 'users':
        return <UserManagementSection />;
      default:
        return (
          <div className="space-y-16">
            <section className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-8" style={{
                backdropFilter: 'blur(10px)'
              }}>
                <Star className="w-4 h-4 mr-2 text-yellow-600" />
                <span className="text-sm text-gray-800">Welcome {username} - Premium IT Services</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gray-900">Internal Blockchain</span>
                <br />
                <span className="text-blue-600">Service & Wallet</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Secure, scalable, and lightning-fast blockchain infrastructure designed for enterprise teams.
                Manage digital assets with confidence.
              </p>
            </section>

            <section className="py-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Powerful IT Solutions
                </h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                  Everything you need to transform your business with cutting-edge technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="text-blue-600 mb-4 group-hover:text-purple-600 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-700 group-hover:text-gray-800 transition-colors">
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
    <div className="min-h-screen bg-white text-gray-900" style={{
      background: 'linear-gradient(135deg, #f0f4f8 0%, #dbeafe 50%, #f0f4f8 100%)'
    }}>
      <ToastContainer />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-30 animate-pulse" style={{
          top: '-10rem',
          right: '-10rem',
          filter: 'blur(40px)'
        }}></div>
        <div className="absolute w-80 h-80 bg-purple-300 rounded-full opacity-30 animate-pulse" style={{
          bottom: '-10rem',
          left: '-10rem',
          filter: 'blur(40px)',
          animationDelay: '1s'
        }}></div>
      </div>

      <div className="flex">
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 min-h-screen p-4 hidden lg:block">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-700">
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
              label="Buy Services"
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
              label="Transaction History"
              isActive={activeSection === 'history'}
              onClick={setActiveSection}
            />
            {groupName === 'admin' && (
              <NavigationItem
                id="entity"
                icon={<Wallet className="w-5 h-5" />}
                label="Entity"
                isActive={activeSection === 'entity'}
                onClick={setActiveSection}
              />)}
            {groupName === 'admin' && (
              <NavigationItem
                id="users"
                icon={<Users className="w-5 h-5" />}
                label="Users"
                isActive={activeSection === 'users'}
                onClick={setActiveSection}
              />
            )}
          </nav>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
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

        <div className="flex-1">
          <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <span className="text-xl font-bold text-blue-700">Felixs</span>
              </div>
            </div>
          </nav>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
          <div className="w-64 bg-white h-full p-4">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-blue-700">Felixs</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
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
                label="Buy Services"
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

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
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