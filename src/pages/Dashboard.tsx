import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Zap, Users, Globe, Star, Menu, X,
  TrendingUp, Wallet, History, ShoppingCart, DollarSign,
  Monitor, ArrowUpRight, ArrowDownRight, Eye, EyeOff, Server,
  Cloud, Database, Code, Smartphone, UserPlus, CheckCircle, XCircle,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import { keycloak } from '../keycloak.ts';


const Dashboard = ({ username }) => {
  const [groupName, setGroupName] = useState(null); // Initialize as null or empty string
  const userName = localStorage.getItem('name');  
  
  
  let fetchUsers

  const role = localStorage.getItem('role');
  if (role === "manager"){
     fetchUsers = async () => {
    try {
       const responses = await fetch(`http://localhost:3010/api/v1/getUser/${userName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
        },
      });

      if (!responses.ok) {
        throw new Error(`HTTP error! status: ${responses.status}`);
      }

      const userData = await responses.json();
      console.log("USerDADADADADADAD", userData);
      localStorage.setItem('userId', userData?.id);
      const userId = localStorage.getItem('userId');

      console.log('userIduserIduserId',userId);
      

      const response = await fetch(`http://localhost:3010/api/v1/getwalletDataofEntity/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("managermanagermanager", data);

      localStorage.setItem('public_key', data?.entities[0]?.wallet.public_key);
      localStorage.setItem('private_key', data?.entities[0]?.wallet.secret_key);
      


    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
    }
  };
  } else {

      fetchUsers = async () => {
    try {

      const response = await fetch(`http://localhost:3010/api/v1/getUser/${userName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("USerDADADADADADAD", data);

      localStorage.setItem('public_key', data?.wallet?.public_key);
      localStorage.setItem('private_key', data?.wallet?.secret_key);
      localStorage.setItem('userId', data?.id);


    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
    }
  };
  }
  

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
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
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

    // State for all services in the main catalog (for 'buy' section)
    const [servicesForSale, setCatalogServices] = useState([]);
    // isLoading controls the loader for the actual API calls (sell and confirmed buy)
    const [isLoading, setIsLoading] = useState(false);

    // State for 'sell' form to list a user's service
    const [sellInput, setSellInput] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [sellFormErrors, setSellFormErrors] = useState({});

    // State to store services that have been listed for sale by the user (not directly used in provided JSX)
    const [listedServices, setListedServices] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Used to store service selected for buying
    const [loading, setLoading] = useState(false); // Used for initial fetch of services in 'buy' section
    const [error, setError] = useState(null);
    const [loadingServiceId, setLoadingServiceId] = useState(null); // Not directly used with current loader strategy, but can be useful for per-item loaders
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Controls visibility of confirmation dialog
    const [pendingService, setPendingService] = useState(null); // Stores the service data for the confirmation dialog

    // Effect to simulate fetching services and populate 'catalogServices'
    useEffect(() => {
      const userId = localStorage.getItem("userId")
      const fetchUsers = async () => {
        try {
          setLoading(true); // Start loading for initial data fetch
          setError(null);
          const response = await fetch(`http://localhost:3010/api/v1/offers?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("userIduserId", data);

          setCatalogServices(data.offers || []);

        } catch (error) {
          console.error('Error fetching users:', error);
          setError(`Failed to load users. Please try again later.`);
        } finally {
          setLoading(false); // Stop loading for initial data fetch
        }
      };

      fetchUsers();
    }, []);

    // Function to handle submission for the 'sell' form (user listing)
    const handleSubmitSell = async () => {
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
        setIsLoading(true); // Start loader for sell operation

        const newUsersListedService = {
          seller_id: localStorage.getItem("userId"),
          service_name: sellInput,
          desc: description,
          amount: String(amount),
          memon: description, // Typo: 'memon' should likely be 'memo'
          price: '1', // Hardcoded price, consider if this should be dynamic
          created_by: localStorage.getItem("name"),
          secretKey: localStorage.getItem("private_key"),
        };

        try {
          const response = await fetch('http://localhost:3010/api/v1/offers/sell', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
            },
            body: JSON.stringify(newUsersListedService),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({
              message: 'No error message provided'
            }));
            throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
          }

          const data = await response.json();
          console.log("Service Listing API Response:", JSON.stringify(data, null, 2));

          // 🥳 Add this line for success toast!
          toast.success("Service created successfully!");

        } catch (error) {
          console.error("Error listing service:", error);
          alert(`Failed to list service: ${error.message}`);
          // Optionally, you can also show an error toast here
          toast.error(`Failed to list service: ${error.message}`);
        } finally {
          setIsLoading(false); // Stop loader for sell operation
          setSellInput('');
          setDescription('');
          setAmount('');
        }
      }
    };

    // ConfirmationDialog component (moved inside ServiceSection for simplicity, or can be external)
    const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, service, isLoading = false }) => {
      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Buy Services</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to buy "<span className="font-semibold">{service?.service_name}</span>" for ${service?.amount}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className={`px-4 py-2 rounded transition-colors ${isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading} // Button disabled when the purchase is processing
                className={`px-4 py-2 rounded transition-colors flex items-center space-x-2 ${isLoading
                  ? 'bg-blue-400 cursor-not-allowed' // Lighter blue when loading
                  : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
              >
                {isLoading ? ( // Show loader and "Processing..." when loading
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm Purchase</span>
                )}
              </button>
            </div>
          </div>
        </div>
      );
    };

    // Modified handleBuyClick function to show the confirmation dialog
    const handleBuyClick = async (service) => {
      setSelectedUser(service); // Store the service that was clicked
      // setLoadingServiceId(service.id); // This state isn't used for the main loader now

      // Show custom confirmation dialog
      setPendingService(service); // Set the service data for the dialog
      setShowConfirmDialog(true);
    };

    // Handle confirmation of purchase
    const handleConfirmPurchase = async () => {
      // Close the confirmation dialog immediately

      const service = pendingService; // Get the service from pending state
      if (!service) return; // Guard clause in case pendingService is null

      const newUsersListedService = { // Data payload for the buy API
        id: service.id, // Assuming 'id' is required for the buy endpoint
        buyer_id: localStorage.getItem("userId"),
        service_name: service.service_name,
        desc: service.desc,
        amount: String(service.amount),
        memo: service.desc, // Typo 'memon' corrected to 'memo'
        price: '1', // Hardcoded, as in sell form
        created_by: localStorage.getItem("name"),
        secretKey: localStorage.getItem("private_key"),
      };

      setIsLoading(true); // <--- Start loader for the actual buy API call

      try {
        const response = await fetch('http://localhost:3010/api/v1/offers/buy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
          },
          body: JSON.stringify(newUsersListedService),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: 'No error message provided'
          }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("Service Buy API Response:", JSON.stringify(data, null, 2));

        // Re-fetch the services to update the list after a successful purchase
        // This ensures the 'buy' table reflects the updated status or removal of the purchased item
        const userId = localStorage.getItem("userId");
        const fetchResponse = await fetch(`http://localhost:3010/api/v1/offers?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
          },
        });

        if (fetchResponse.ok) {

          const fetchData = await fetchResponse.json();
          setCatalogServices(fetchData.offers || []);
          setIsLoading(false); // <--- Stop loader regardless of success or failure
          setShowConfirmDialog(false);

        }

      } catch (error) {
        console.error("Error buying service:", error);
        alert(`Failed to buy service: ${error.message}`);
      } finally {
        setIsLoading(false); // <--- Stop loader regardless of success or failure
        setLoadingServiceId(null); // Clear any specific service loading state
        setPendingService(null); // Clear the pending service
        setShowConfirmDialog(false);
        // No form fields to clear here, as this is a buy operation from a list
      }
    };

    // Handle cancellation of purchase from the dialog
    const handleCancelPurchase = () => {
      setShowConfirmDialog(false); // Close dialog
      setLoadingServiceId(null); // Clear any specific service loading state
      setPendingService(null); // Clear the pending service
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">{type === 'sell' ? 'Sell Services' : 'Buy Services'}</h2>

        <div className={`grid gap-8 ${type === 'sell' ? 'grid-cols-1' : 'grid-cols-1'}`}>
          <div>
            {type === 'sell' && (
              <>
                <div className="space-y-6 rounded-2xl border border-gray-300" style={{ width: '68rem', margin: 'auto', padding: "2rem" }}>
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
                      className="w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
                      disabled={isLoading} // Disable button while selling
                    >
                      {isLoading ? ( // Show loader when isLoading is true
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-3" />
                          Processing...
                        </>
                      ) : (
                        'Sell Service'
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {type === 'buy' && (
              <>
                <div className="space-y-6 rounded-2xl border border-gray-300" style={{ padding: "2rem" }}>
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
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {loading ? ( // Loader for initial fetch of buyable services
                              <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                  <div className="flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Loading services...
                                  </div>
                                </td>
                              </tr>
                            ) : error ? (
                              <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-red-500">
                                  {error}
                                </td>
                              </tr>
                            ) : servicesForSale.length === 0 ? (
                              <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                  No services available.
                                </td>
                              </tr>
                            ) : (
                              servicesForSale.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{service.service_name}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">{service.desc}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">${service.amount}</td>
                                  <td className={`px-6 py-4 text-sm font-medium ${service.status === 'active'
                                    ? 'text-green-600'
                                    : service.status === 'completed'
                                      ? 'text-blue-600'
                                      : 'text-gray-700'
                                    }`}>
                                    {service.status}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-700">
                                    <button
                                      onClick={() => handleBuyClick(service)}
                                      className="font-semibold py-1 px-3 rounded-lg transition-colors duration-300 bg-blue-600 hover:bg-blue-700 text-white"
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
                </div>
              </>
            )}
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <ConfirmationDialog
            isOpen={showConfirmDialog}
            onConfirm={handleConfirmPurchase} // This function will trigger the isLoading state change
            onCancel={handleCancelPurchase}
            service={pendingService}
            isLoading={isLoading} // Pass isLoading to the dialog to control its internal button loader
          />
        )}
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
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentType === 'sell'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                Sell Services
              </button>
              <button
                onClick={() => setCurrentType('buy')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentType === 'buy'
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
    // State for orders is still useful to display the history
    const [orders, setOrders] = useState(orderHistory);
    const userId = localStorage.getItem("userId");
    const fetchUsers = async () => { // Pass groupName as an argument

      console.log("groupName", groupName);

      try {
        let apiUrl;

        if (groupName === 'admin') {
          apiUrl = `http://localhost:3010/api/v1/transactions`;

        } else {
          apiUrl = `http://localhost:3010/api/v1/transactions?userId=${userId}`;
        }

        console.log("transactions data:transactions data:", apiUrl);


        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("transactions data:", data);

        setOrders(data.transactions || []);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    // Fetch users when the component mounts
    useEffect(() => {
      fetchUsers();
    }, []);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction Id</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Memo</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Asset Code</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction Hash</th>

                  {/* The 'Actions' column header is removed */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.id}
                    </td>

                    <td className={`px-6 py-4 text-sm font-medium ${order.transaction_type === 'sell'
                        ? 'text-red-800  rounded-full px-3 py-1 inline-block'
                        : order.transaction_type === 'buy'
                          ? 'text-green-800  rounded-full px-3 py-1 inline-block'
                          : 'text-gray-900'
                      }`}>
                      {order.transaction_type}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">{order.memo}</td>

                    <td className="px-6 py-4 text-sm text-gray-700">{order.asset_code}</td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      ${order.amount}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.tx_hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All dialogs (Approve/Reject) and their related JSX are removed */}
      </div>
    );
  };


  // New User Management Section
  const AddUserDialog = ({ onClose, onUserAdded }) => { // Added onUserAdded prop
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userPayload = {
        name: name,
        email: email,
        password: "123456",
        created_by: localStorage.getItem("name")
      };

      console.log("KcAdminKcAdmin", userPayload);
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3010/api/v1/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
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
        setIsLoading(false)
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
              onClick={handleSubmit} // Ensure onClick is explicitly set if type is submit, or remove type="submit" and just use onClick
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center" // 👈 Added flex, items-center, justify-center for centering content
              disabled={isLoading} // 👈 Disable button when loading
            >
              {isLoading ? (
                <>
                  {/* Basic spinning loader SVG */}
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                'Add User'
              )}
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
        const response = await fetch(`http://localhost:3010/api/v1/getAllUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
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
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
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
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user?.walletData?.public_key
                          ? `${user.walletData.public_key.substring(0, 6)}....${user.walletData.public_key.substring(user.walletData.public_key.length - 6)}`
                          : 'N/A'} {/* or an empty string, or a placeholder */}
                      </td>
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

  const CheckboxMultiSelect = ({ options, selectedValues, onChange, label, disabled, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        onChange([...selectedValues, value]);
      } else {
        onChange(selectedValues.filter((item) => item !== value));
      }
    };

    const getDisplayValue = () => {
      if (loading) return `Loading ${label.toLowerCase()}...`;
      if (selectedValues.length === 0) return `Select ${label.toLowerCase()}`;
      if (selectedValues.length === options.length && options.length > 0) return `All ${label.toLowerCase()} selected`;
      // Map selected IDs back to their names for display
      return selectedValues
        .map((id) => options.find((opt) => opt.id === id)?.name)
        .filter(Boolean) // Filter out any undefined names if an ID isn't found
        .join(', ');
    };

    return (
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <button
          type="button"
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
        >
          <span>{getDisplayValue()}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-3 text-gray-600">Loading...</div>
            ) : options.length === 0 ? (
              <div className="p-3 text-gray-600">No {label.toLowerCase()} available</div>
            ) : (
              options.map((option) => (
                <label key={option.id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.id}
                    checked={selectedValues.includes(option.id)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-gray-800">{option.name}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  const AddEntityDialog = ({ onClose, onEntityAdded }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [managerId, setManagerId] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // For form submission
    const [managers, setManagers] = useState([]);
    const [members, setMembers] = useState([]);
    const [managersLoading, setManagersLoading] = useState(false); // For managers data fetch
    const [membersLoading, setMembersLoading] = useState(false);   // For members data fetch
    const [error, setError] = useState(null); // State to hold any fetch errors
    const [users, setUsers] = useState([]);



    const fetchManagers = async (token) => {
      console.log("Fetching managers with token:", token ? "Token present" : "Token missing");
      try {
        const response = await fetch(`http://localhost:3010/api/v1/getAllUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Use the passed token
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("data.datadata.data (Managers):", data); // Specific log for managers

        // Map the fetched data to ensure each object has 'id' and 'name' properties.
        // This is crucial for consistency with UI components like CheckboxMultiSelect and select dropdowns.
        return (data || []).map(user => ({
          id: user.id || user._id || user.userId, // Prioritize common ID fields, adjust as per your API
          name: user.name || user.fullName || user.username // Prioritize common name fields, adjust as per your API
        }));
      } catch (error) {
        console.error('Error fetching managers:', error);
        // Provide a more specific error message for "Failed to fetch"
        if (error.message === 'Failed to fetch') {
          throw new Error('Failed to connect to the backend server. Please ensure the server is running and accessible at http://localhost:3010.');
        }
        throw error; // Re-throw the error to be caught by the calling useEffect
      }
    };


    const fetchMembers = async (token) => {
      console.log("Fetching members with token:", token ? "Token present" : "Token missing");
      try {
        const response = await fetch(`http://localhost:3010/api/v1/getAllUsers`, { // Assuming same endpoint for members
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Use the passed token
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("members data.data (Members):", data); // Specific log for members

        return (data || []).map(user => ({
          id: user.id || user._id || user.userId, // Prioritize common ID fields, adjust as per your API
          name: user.name || user.fullName || user.username // Prioritize common name fields, adjust as per your API
        }));
      } catch (error) {
        console.error('Error fetching members:', error);
        if (error.message === 'Failed to fetch') {
          throw new Error('Failed to connect to the backend server. Please ensure the server is running and accessible at http://localhost:3010.');
        }
        throw error; // Re-throw the error to be caught by the calling useEffect
      }
    };

    useEffect(() => {
      const token = localStorage.getItem('token');

      const loadData = async () => {
        setManagersLoading(true);
        setMembersLoading(true); // Set both to true initially
        setError(null); // Clear previous errors

        try {
          const fetchedManagers = await fetchManagers(token);
          console.log("fetchedManagersfetchedManagers", fetchedManagers); // This will now show the mapped data
          setManagers(fetchedManagers);
        } catch (err) {
          console.error("Error fetching managers:", err);
          setError(`Failed to load managers: ${err.message}`);
        } finally {
          setManagersLoading(false);
        }

        try {
          const fetchedMembers = await fetchMembers(token);
          setMembers(fetchedMembers);
        } catch (err) {
          console.error("Error fetching members:", err);
          setError(prevErr => prevErr ? `${prevErr}\nFailed to load members: ${err.message}` : `Failed to load members: ${err.message}`);
        } finally {
          setMembersLoading(false);
        }
      };

      loadData();
    }, []); // Empty dependency array means this runs once on mount

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // Clear previous errors on new submission

      const entityPayload = {
        name: name,
        type: type,
        description: '',
        owner_id: managerId,
        members: selectedMembers,
        created_by: localStorage.getItem("name")
      };

      console.log("Entity Creation Payload:", entityPayload);
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3010/api/v1/entity/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(entityPayload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'No error message provided' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("Entity Creation API Response:", JSON.stringify(data, null, 2));
        setUsers(data || [])
        onClose();
        onEntityAdded(); // Notify parent component that entity was added

      } catch (err) {
        console.error("Error adding entity:", err);
        // Display a user-friendly error message
        if (err.message === 'Failed to fetch') {
          setError('Failed to connect to the backend server for submission. Please ensure the server is running and accessible at http://localhost:3010.');
        } else {
          setError(`Failed to add entity: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-md border border-gray-200 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Entity</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a type</option>
                <option value="coe">COE</option>
                <option value="project">Project</option>
                {/* <option value="Member">Member</option> - If this is a top-level entity, it might need different handling */}
              </select>
            </div>
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
              <label htmlFor="manager" className="block text-sm font-medium text-gray-700 mb-2">Select Manager</label>
              <select
                id="manager"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={managersLoading} // Disable if managers are loading
              >
                <option value="">{managersLoading ? 'Loading managers...' : 'Select a manager'}</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Custom CheckboxMultiSelect for members */}
            <CheckboxMultiSelect
              label="Select Members"
              options={members}
              selectedValues={selectedMembers}
              onChange={setSelectedMembers}
              disabled={membersLoading} // Disable if members are loading
              loading={membersLoading} // Pass loading state to component for internal display
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
              disabled={isLoading || managersLoading || membersLoading} // Disable button if any process is loading
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Entity...
                </>
              ) : (
                'Add Entity'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const EntityManagementSection = () => {
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3010/api/v1/entities`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here
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

    const handleIssueClick = (user) => {
      console.log("handleIssueClick called with user:", user);
      console.log("User object keys:", Object.keys(user));
      console.log("User wallet_public_key:", user.wallet_public_key);
      console.log("User entity_name:", user.entity_name);

      setSelectedUser(user);
      setIsIssueDialogOpen(true);
    };

    const handleSubmitIssue = async ({ amount, comment }) => {
      // Debug logging to see what we have
      console.log("selectedUser:", selectedUser);


      const payload = {
        receiverPublicKey: selectedUser.wallet_public_key,
        amount: String(amount),
        memo: comment,
        walletId: selectedUser.wallet_id

      }

      console.log("payloadpayloadpayload", payload);

      try {
        const response = await fetch('http://localhost:3010/api/v1/bluedollar/issue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'No error message provided' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("Issue Funds API Response:", JSON.stringify(data, null, 2));


      } catch (error) {
        console.error("Error issuing funds:", error);
        alert(`Failed to issue funds: ${error.message}`);
      }
    };

    // Function to call when a user is successfully added
    const handleUserAdded = () => {
      fetchUsers(); // Re-fetch the user list to update the table
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Entity Management</h2>
          <button
            onClick={() => setIsAddUserDialogOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create Entity</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Wallet Balance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Manager</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Entity Wallet id</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading entities...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No entities found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.entity_name}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user?.wallet_balance}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user?.owner_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user?.wallet_public_key
                          ? `${user.wallet_public_key.substring(0, 6)}....${user.wallet_public_key.substring(user.wallet_public_key.length - 6)}`
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          onClick={() => handleIssueClick(user)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-300"
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
          <AddEntityDialog
            onClose={() => setIsAddUserDialogOpen(false)}
            onUserAdded={handleUserAdded}
          />
        )}

        {isIssueDialogOpen && selectedUser && (
          <IssueDialog
            onClose={() => setIsIssueDialogOpen(false)}
            onSubmitIssue={handleSubmitIssue}
            selectedEntity={selectedUser} // Pass the entire entity object
            entityName={selectedUser.entity_name} // Use entity_name instead of username
            entityType={selectedUser.type}
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
        case 'entity':
        return <EntityManagementSection />;
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
      <ToastContainer />
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
                id="entity"
                icon={<Wallet className="w-5 h-5" />}
                label="Entity"
                isActive={activeSection === 'entity'}
                onClick={setActiveSection}
              />)}
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