import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmationDialog from './ConfirmationDialog.tsx';

const ServiceSection = ({ type }) => {
  const [servicesForSale, setCatalogServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sellInput, setSellInput] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [sellFormErrors, setSellFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingServiceId, setLoadingServiceId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingService, setPendingService] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/offers?userId=${userId}`, {
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
        setCatalogServices(data.offers || []);

      } catch (error) {
        console.error('Error fetching users:', error);
        setError(`Failed to load users. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      setIsLoading(true);

      const newUsersListedService = {
        seller_id: localStorage.getItem("userId"),
        service_name: sellInput,
        desc: description,
        amount: String(amount),
        memon: description,
        price: '1',
        created_by: localStorage.getItem("name"),
        secretKey: localStorage.getItem("private_key"),
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/offers/sell`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        toast.success("Service created successfully!");

      } catch (error) {
        console.error("Error listing service:", error);
        alert(`Failed to list service: ${error.message}`);
        toast.error(`Failed to list service: ${error.message}`);
      } finally {
        setIsLoading(false);
        setSellInput('');
        setDescription('');
        setAmount('');
      }
    }
  };

  const handleBuyClick = async (service) => {
    setPendingService(service);
    setShowConfirmDialog(true);
  };

  const handleConfirmPurchase = async () => {
    const service = pendingService;
    if (!service) return;

    const newUsersListedService = {
      id: service.id,
      buyer_id: localStorage.getItem("userId"),
      service_name: service.service_name,
      desc: service.desc,
      amount: String(service.amount),
      memo: service.desc,
      price: '1',
      created_by: localStorage.getItem("name"),
      secretKey: localStorage.getItem("private_key"),
    };

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/offers/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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
      const userId = localStorage.getItem("userId");
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/offers?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (fetchResponse.ok) {
        const fetchData = await fetchResponse.json();
        setCatalogServices(fetchData.offers || []);
        setIsLoading(false);
        setShowConfirmDialog(false);
      }

    } catch (error) {
      console.error("Error buying service:", error);
      alert(`Failed to buy service: ${error.message}`);
    } finally {
      setIsLoading(false);
      setLoadingServiceId(null);
      setPendingService(null);
      setShowConfirmDialog(false);
    }
  };

  const handleCancelPurchase = () => {
    setShowConfirmDialog(false);
    setLoadingServiceId(null);
    setPendingService(null);
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
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
                          {loading ? (
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

      {showConfirmDialog && (
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onConfirm={handleConfirmPurchase}
          onCancel={handleCancelPurchase}
          service={pendingService}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ServiceSection;