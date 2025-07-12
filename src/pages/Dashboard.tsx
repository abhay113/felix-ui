import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Zap, Users, Globe, Star, Menu, X,
  TrendingUp, Wallet, History, ShoppingCart, DollarSign,
  Monitor, ArrowUpRight, ArrowDownRight, Eye, EyeOff, Server,
  Cloud, Database, Code, Smartphone, UserPlus, CheckCircle, XCircle,
  MoreVertical
} from 'lucide-react';
import { keycloak } from '../keycloak.ts';


const Dashboard = ({ username }) => {
  const [groupName, setGroupName] = useState(null); // Initialize as null or empty string
  const userName = localStorage.getItem('name');
  const fetchUsers = async () => {
    try {

      const response = await fetch(`http://localhost:3010/api/v1/getUserByName/${userName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("USerDADADADADADAD", data);

      localStorage.setItem('public_key', data?.wallet?.public_key);
      localStorage.setItem('Private_key', data?.wallet?.secret_key);

    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Effect to load groupName from localStorage once on component mount ---
  useEffect(() => {
    const storedGroupName = localStorage.getItem('groupName');
    if (storedGroupName) {
      setGroupName(storedGroupName);
      console.log('Primary group name retrieved from localStorage and set to state:', storedGroupName);
    } else {
      console.log('No primary group name found in localStorage on mount.');
    }
  }, []);
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

  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);



  // Mock IT services data
  const itServices = [
    {
      listingType: 'buy',
      name: 'Web Development',
      price: 2500.00,
      change: 5.2,
      icon: <Code className="w-6 h-6" />,
      unit: 'project',
      description: 'Custom web application development'
    },
    {
      listingType: 'sell',
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

  const AccountSection = () => {

    const key = localStorage.getItem("public_key")
    // State for managing user data, loading, and errors
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBalance, setShowBalance] = useState(true); // State to toggle balance visibility

    // Mock user data for demonstration purposes, replace with actual user from `users` state if available
    const mockUser = {
      balance: {
        USD: 12345.67,
        credits: 500,
      },
    };

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3010/api/v1/account/balance/${key}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data.datadata.data", data.data);

        // Assuming the API returns an array of users or a single user object.
        // If it returns an array and you only care about the first user, adjust accordingly.
        setUsers(data.data || []);

      } catch (error) {
        console.error('Error fetching users:', error);
        setError(`Failed to load users. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch users when the component mounts
    useEffect(() => {
      fetchUsers();
    }, []); // Empty dependency array means this effect runs once after the initial render

    if (loading) {
      return <div className="text-center py-8">Loading account details...</div>;
    }

    if (error) {
      return <div className="text-center py-8 text-red-600">Error: {error}</div>;
    }

    // You might want to get the actual user data from the `users` state here
    // For now, `mockUser` is used as a fallback or example

    return (
      <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md"> {/* Added some padding, background, and shadow for better appearance */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900">My Account Overview</h2> {/* Enhanced heading */}
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 transition-all duration-300 ease-in-out" // Styled button
          >
            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span className="font-medium">{showBalance ? 'Hide Details' : 'Show Details'}</span>
          </button>
        </div>

        <hr className="border-t border-gray-200" /> {/* Separator */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap for better spacing */}
          {/* Account Balance Card */}
          <div className="bg-gradient-to-br from-blue-300 to-purple-300 rounded-3xl p-8 border border-blue-400 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"> {/* Enhanced card styling */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Account Balance(BlueDoller)</h3> {/* Changed text color to white for contrast */}
              <DollarSign className="w-8 h-8 text-green-700" /> {/* Larger icon, adjusted color */}
            </div>
            <div className="text-4xl font-extrabold text-white"> {/* Larger and bolder text */}
              {showBalance ? `$${users.balances?.blueDollar}` : '••••••'}
            </div>
            <div className="text-sm text-blue-900 mt-2">Current funds available</div> {/* Added descriptive text */}
          </div>

          {/* Service Credits Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"> {/* Enhanced card styling */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">XLM Credits</h3> {/* Changed text color */}
              <Monitor className="w-8 h-8 text-blue-700" /> {/* Larger icon, adjusted color */}
            </div>
            <div className="text-3xl font-extrabold text-gray-900"> {/* Larger and bolder text */}
              {showBalance ? users.balances?.xlm : '••••'}
            </div>
            <div className="text-base text-gray-600 mt-2">Available for service usage</div> {/* More descriptive text */}
          </div>
        </div>
      </div>
    );
  };


  const initialCatalogData = [];

  // staticBuyableServices: This will be used for the 'Buy' dropdown AND added to the catalo

const ServiceSection = ({ type }) => {
  const staticBuyableServices = [
    { id: 'static_web_dev', name: 'Static Web Dev Package', description: 'A basic website', price: 999, unit: 'package', icon: '📦', change: 0, listingType: ['buy', 'sell'] },
    { id: 'static_mobile_basic', name: 'Basic Mobile App', description: 'Simple cross-platform app', price: 2500, unit: 'app', icon: '📱', change: 0, listingType: ['buy', 'sell'] },
    { id: 'static_cloud_starter', name: 'Cloud Starter Pack', description: 'Initial cloud setup', price: 400, unit: 'setup', icon: '☁️', change: 0, listingType: ['buy', 'sell'] },
    { id: 'static_data_report', name: 'Data Insights Report', description: 'Monthly data report', price: 150, unit: 'report', icon: '📈', change: 0, listingType: ['buy', 'sell'] },
  ];

  const [servicesForSale] = useState([
    {
      id: 'srvc001',
      name: 'Premium Account',
      description: 'Unlock all premium features, ad-free experience, and priority support.',
      amount: 19.99,
    },
    {
      id: 'srvc002',
      name: 'Extra Storage (100GB)',
      description: 'Add 100GB of secure cloud storage to your account.',
      amount: 5.00,
    },
    {
      id: 'srvc003',
      name: 'Custom Domain Integration',
      description: 'Connect your own custom domain to your profile or project.',
      amount: 10.00,
    },
    {
      id: 'srvc004',
      name: 'Analytics Dashboard Pro',
      description: 'Advanced analytics and reporting tools for detailed insights.',
      amount: 29.99,
    },
    {
      id: 'srvc005',
      name: '24/7 Priority Support',
      description: 'Access to dedicated support staff around the clock.',
      amount: 15.00,
    },
  ]);

  // State for all services in the main catalog
  const [catalogServices, setCatalogServices] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(null);

  // State for 'sell' form to list a user's service
  const [sellInput, setSellInput] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [sellFormErrors, setSellFormErrors] = useState({});
  
  // State to store services that have been listed for sale by the user
  const [listedServices, setListedServices] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for 'buy' form
  const [selectedService, setSelectedService] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('1');

  // Effect to simulate fetching services and populate 'catalogServices'
  useEffect(() => {
    const fetchServices = async () => {
      setCatalogLoading(true);
      setCatalogError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        // Initialize catalogServices with staticBuyableServices
        setCatalogServices([...staticBuyableServices]);

        // Set default selected service for 'buy' dropdown from static data
        setSelectedService(staticBuyableServices[0]?.id || '');

      } catch (error) {
        setCatalogError('Failed to load services. Please try again.');
        console.error('Error fetching catalog services:', error);
      } finally {
        setCatalogLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter catalog services based on the 'type' prop for the main display
  const filteredCatalogServices = catalogServices.filter(service => service.listingType?.includes(type));

  // Function to handle submission for the 'sell' form (user listing)
  const handleSubmitSell = () => {
    setSellFormErrors({});

    let newErrors = {};
    let isValid = true;

    if (!sellInput.trim()) {
      newErrors.sellInput = 'Service name is required.';
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
      isValid = false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number.';
      isValid = false;
    }

    setSellFormErrors(newErrors);

    if (isValid) {
      const newServiceId = `user_listed_${Date.now()}`;

      const newUsersListedService = {
        id: newServiceId,
        name: sellInput,
        description: description,
        amount: parseFloat(amount),
      };

      const newCatalogEntry = {
        id: newServiceId,
        name: sellInput,
        description: description,
        price: parseFloat(amount),
        unit: 'project',
        icon: '📝',
        change: 0,
        listingType: ['buy', 'sell'],
      };

      setListedServices(prev => [...prev, newUsersListedService]);
      setCatalogServices(prev => [...prev, newCatalogEntry]);

      // Clear form
      setSellInput('');
      setDescription('');
      setAmount('');
    }
  };

  const handleBuyClick = (service) => {
    setSelectedUser(service);
    // Add your buy logic here
    console.log('Buying service:', service);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{type === 'sell' ? 'Sell Services' : 'Buy Services'}</h2>

      {/* Conditionally apply grid columns based on 'type' */}
      <div className={`grid gap-8 ${type === 'sell' ? 'grid-cols-1' : 'grid-cols-1'}`}>
        {/* Service Catalog Section - Only show for 'sell' type */}
        {/* {type === 'sell' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Catalog</h3>
            {catalogLoading ? (
              <div className="text-center py-8 text-gray-500">Loading services...</div>
            ) : catalogError ? (
              <div className="text-center py-8 text-red-500">{catalogError}</div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredCatalogServices.length > 0 ? (
                  filteredCatalogServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-600">{service.icon}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-600">{service.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${service.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per {service.unit}</div>
                        {service.change !== 0 && (
                          <div className={`text-sm flex items-center ${service.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {service.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                            {Math.abs(service.change)}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No services available for this type.</p>
                )}
              </div>
            )}
          </div>
        )} */}

        {/* Right Section: List Service / Place Order */}
        <div>
          {type === 'sell' && (
            <>
              <div className="space-y-6 rounded-2xl  border border-gray-300" style={{ width: '68rem', marginLeft:'15rem', padding:"2rem"}}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sellInput" className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                    <input
                      type="text"
                      id="sellInput"
                      value={sellInput}
                      onChange={(e) => setSellInput(e.target.value)}
                      placeholder="e.g., Custom Web Design"
                      className={`w-full bg-gray-100 border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${sellFormErrors.sellInput ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {sellFormErrors.sellInput && <p className="text-red-500 text-xs mt-1">{sellFormErrors.sellInput}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed description of your service"
                      rows="3"
                      className={`w-full bg-gray-100 border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${sellFormErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {sellFormErrors.description && <p className="text-red-500 text-xs mt-1">{sellFormErrors.description}</p>}
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g., 500.00"
                      min="0"
                      step="0.01"
                      className={`w-full bg-gray-100 border rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${sellFormErrors.amount ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {sellFormErrors.amount && <p className="text-red-500 text-xs mt-1">{sellFormErrors.amount}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmitSell}
                    className="w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Sell Service
                  </button>
                </div>
              </div>
            </>
          )}

          {type === 'buy' && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Services</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Service Name</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                              Loading services...
                            </td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-red-500">
                              {error}
                            </td>
                          </tr>
                        ) : servicesForSale.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                              No services available.
                            </td>
                          </tr>
                        ) : (
                          servicesForSale.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{service.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">{service.description}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">${service.amount.toFixed(2)}</td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                <button
                                  onClick={() => handleBuyClick(service)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300"
                                >
                                  Buy
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage component to demonstrate both sell and buy modes
const ServiceApp = () => {
  const [currentType, setCurrentType] = useState('sell');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentType('sell')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentType === 'sell' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sell Services
            </button>
            <button
              onClick={() => setCurrentType('buy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentType === 'buy' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Buy Services
            </button>
          </div>
        </div>
        
        <ServiceSection type={currentType} />
      </div>
    </div>
  );
};


  const OrderHistorySection = () => {
    const [orders, setOrders] = useState(orderHistory);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    // State to manage which dropdown is open
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null); // Ref for detecting clicks outside

    // Close dropdown if clicked outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpenDropdownId(null);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const openApproveDialog = (orderId) => {
      setSelectedOrderId(orderId);
      setShowApproveDialog(true);
      setOpenDropdownId(null); // Close dropdown when dialog opens
    };

    const openRejectDialog = (orderId) => {
      setSelectedOrderId(orderId);
      setRejectionReason('');
      setShowRejectDialog(true);
      setOpenDropdownId(null); // Close dropdown when dialog opens
    };

    const closeDialogs = () => {
      setShowApproveDialog(false);
      setShowRejectDialog(false);
      setSelectedOrderId(null);
      setRejectionReason('');
    };

    const confirmApprove = () => {
      if (selectedOrderId !== null) {
        console.log(`Approving order: ${selectedOrderId}`);
        setOrders(orders.map(order =>
          order.id === selectedOrderId ? { ...order, status: 'completed' } : order
        ));
      }
      closeDialogs();
    };

    const confirmReject = () => {
      if (selectedOrderId !== null && rejectionReason.trim() !== '') {
        console.log(`Rejecting order: ${selectedOrderId} with reason: "${rejectionReason}"`);
        setOrders(orders.map(order =>
          order.id === selectedOrderId ? { ...order, status: 'rejected', rejectionReason: rejectionReason } : order
        ));
      } else {
        alert('Please provide a rejection reason.');
        return;
      }
      closeDialogs();
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.type === 'buy'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}>
                        {order.type === 'buy' ? <ShoppingCart className="w-3 h-3 mr-1" /> : <DollarSign className="w-3 h-3 mr-1" />}
                        {order.type === 'buy' ? 'BUY' : 'SALE'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {itServices.find(s => s.id === order.service)?.name || order.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">${order.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'approved'
                            ? 'bg-purple-100 text-purple-700'
                            : order.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {order.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {order.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                        {order.status}
                      </span>
                      {order.status === 'rejected' && order.rejectionReason && (
                        <p className="text-xs text-gray-500 mt-1">Reason: {order.rejectionReason}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 relative"> {/* Added relative positioning for dropdown */}
                      {/* Actions Dropdown */}
                      <div ref={openDropdownId === order.id ? dropdownRef : null}>
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === order.id ? null : order.id)}
                          className="p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          aria-label="More actions"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openDropdownId === order.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                              {order.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => openApproveDialog(order.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => openRejectDialog(order.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {order.status === 'completed' && (
                                <span className="block px-4 py-2 text-sm text-gray-500 italic">No actions needed</span>
                              )}
                              {order.status === 'approved' && (
                                <span className="block px-4 py-2 text-sm text-gray-500 italic">Already Approved</span>
                              )}
                              {order.status === 'rejected' && (
                                <span className="block px-4 py-2 text-sm text-gray-500 italic">Already Rejected</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approve Dialog (unchanged) */}
        {showApproveDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Confirm Approval</h3>
              <p className="text-gray-700 mb-6">Are you sure you want to approve this order?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeDialogs}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Dialog (unchanged) */}
        {showRejectDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Reject Order</h3>
              <p className="text-gray-700 mb-4">Please provide a reason for rejecting this order:</p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
              ></textarea>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeDialogs}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  // New User Management Section
  const AddUserDialog = ({ onClose, onUserAdded }) => { // Added onUserAdded prop
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userPayload = {
        name: name,
        email: email,
        password: "123456",
        created_by: localStorage.getItem("name")
      };

      console.log("KcAdminKcAdmin", userPayload);

      try {
        const response = await fetch('http://localhost:3010/api/v1/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userPayload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'No error message provided' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("User Creation API Response:", JSON.stringify(data, null, 2));

        onClose(); // Close the modal
        onUserAdded(); // Call this function to trigger a re-fetch in the parent component

      } catch (error) {
        console.error("Error adding user:", error);
        alert(`Failed to add user: ${error.message}`);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md border border-gray-200 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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

  const IssueDialog = ({ onClose, onSubmitIssue, userName, onAmmoutAdded }) => {
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
      if (amount && comment) {
        onSubmitIssue({ amount: parseFloat(amount), comment });
        onAmmoutAdded()
        onClose();
      } else {
        alert('Please enter both amount and comment.');
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Issue Bluedoller</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a comment"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Issue
            </button>
          </div>
        </div>
      </div>
    );
  };

  // UserManagementSection Component
  const UserManagementSection = () => {
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3010/api/v1/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data.datadata.data", data);

        setUsers(data || []);

      } catch (error) {
        console.error('Error fetching users:', error);
        setError(`Failed to load users. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch users when the component mounts
    useEffect(() => {
      fetchUsers();
    }, []);

    // Function to call when a user is successfully added
    const handleUserAdded = () => {
      fetchUsers(); // Re-fetch the user list to update the table
    };

    const handleIssueClick = (user) => {
      setSelectedUser(user);
      setIsIssueDialogOpen(true);
    };

    const handleSubmitIssue = async ({ amount, comment }) => {
      // Ensure selectedUser is available before trying to access its properties
      if (selectedUser && selectedUser.walletData) {
        const public_key = selectedUser.walletData.public_key;
        console.log(`Issuing ${amount} to ${selectedUser.username} (Wallet ID: ${public_key}) with comment: "${comment}"`);

        const payload = {
          receiverPublicKey: public_key,
          amount: String(amount),
          memo: comment,
          walletId: selectedUser.walletData.id
        }

        console.log("payloadpayloadpayload", payload);

        try {

          const response = await fetch('http://localhost:3010/api/v1/bluedollar/issue', { // Changed from /api/v1/create to /api/v1/issue
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Changed userPayload to payload
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'No error message provided' }));
            throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
          }

          const data = await response.json();
          console.log("Issue Funds API Response:", JSON.stringify(data, null, 2)); // Changed log message
        } catch (error) {
          console.error("Error issuing funds:", error); // Changed error message
          alert(`Failed to issue funds: ${error.message}`);
        }

      } else {
        console.error("Error: selectedUser or selectedUser.walletData is not available.");
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <button
            onClick={() => setIsAddUserDialogOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Wallet balance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Wallet id</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th> {/* New column for actions */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user?.walletData?.balance}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user?.walletData?.public_key}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          onClick={() => handleIssueClick(user)}
                          className="
                        bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300"
                        >
                          Issue
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isAddUserDialogOpen && (
          <AddUserDialog
            onClose={() => setIsAddUserDialogOpen(false)}
            onUserAdded={handleUserAdded}
          />
        )}

        {isIssueDialogOpen && selectedUser && (
          <IssueDialog
            onClose={() => setIsIssueDialogOpen(false)}
            onSubmitIssue={handleSubmitIssue}
            userName={selectedUser.username}
            onAmmoutAdded={handleUserAdded}
          />
        )}
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
                id="users" // New Navigation Item for Users
                icon={<Users className="w-5 h-5" />}
                label="Users"
                isActive={activeSection === 'users'}
                onClick={setActiveSection}
              />
            )}
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