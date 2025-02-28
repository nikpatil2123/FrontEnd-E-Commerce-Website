import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const DiscountGenerator = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [count, setCount] = useState(1);
  const [copies, setCopies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [discountPercent, setDiscountPercent] = useState('');
  const [orderCondition, setOrderCondition] = useState('');
  // New state for max uses per user
  const [maxUsesPerUser, setMaxUsesPerUser] = useState(1);

  // State for coupon-by-value section
  const [valueCoupons, setValueCoupons] = useState([]);
  const [discountAmountInput, setDiscountAmountInput] = useState('');
  const [couponByValueCount, setCouponByValueCount] = useState(1);
  const [valueEditIndex, setValueEditIndex] = useState(null);
  // Add max uses per user for value coupons as well
  const [valueMaxUsesPerUser, setValueMaxUsesPerUser] = useState(1);

  // Load coupons from server on component mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/coupons`);
        if (response.data && Array.isArray(response.data)) {
          // Transform server data to match local state format if needed
          const serverCoupons = response.data.map(coupon => ({
            code: coupon.code,
            remaining: coupon.remaining,
            discountPercent: coupon.discountPercent || '',
            orderCondition: coupon.orderCondition || '',
            maxUsesPerUser: coupon.maxUsesPerUser || 1,
            enabled: coupon.enabled || false,
            id: coupon._id
          }));
          setCopies(serverCoupons);
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };
    
    fetchCoupons();
  }, []);

  const generateCoupon = async () => {
    if (discountCode.trim() === '' || count < 1) return;
    
    const newCoupon = { 
      code: discountCode.trim(), 
      remaining: count, 
      discountPercent, 
      orderCondition,
      maxUsesPerUser, // Include the max uses per user limitation
      enabled: false 
    };
    
    try {
      if (editIndex !== null) {
        // Update existing coupon
        const couponToUpdate = copies[editIndex];
        if (couponToUpdate.id) {
          await axios.put(`${API_BASE_URL}/api/admin/coupons/${couponToUpdate.id}`, newCoupon);
          setCopies(prev =>
            prev.map((coupon, i) => (i === editIndex ? {...newCoupon, id: couponToUpdate.id} : coupon))
          );
        } else {
          // Local-only coupon update
          setCopies(prev =>
            prev.map((coupon, i) => (i === editIndex ? newCoupon : coupon))
          );
        }
        setEditIndex(null);
      } else {
        // Create new coupon
        const response = await axios.post(`${API_BASE_URL}/api/admin/coupons`, newCoupon);
        // Add newly created coupon with server-generated ID
        setCopies(prev => [...prev, {...newCoupon, id: response.data._id}]);
      }
      
      // Reset form
      setDiscountCode('');
      setCount(1);
      setDiscountPercent('');
      setOrderCondition('');
      setMaxUsesPerUser(1);
    } catch (error) {
      console.error('Error saving coupon:', error);
      alert('Failed to save coupon. Please try again.');
    }
  };

  const deleteCoupon = async (index) => {
    const couponToDelete = copies[index];
    
    try {
      if (couponToDelete.id) {
        // Delete from server if it has an ID
        await axios.delete(`${API_BASE_URL}/api/admin/coupons/${couponToDelete.id}`);
      }
      
      setCopies(prev => prev.filter((_, i) => i !== index));
      if (editIndex === index) setEditIndex(null);
    } catch (error) {
      console.error('Error deleting coupon:', error);
      alert('Failed to delete coupon. Please try again.');
    }
  };

  const editCoupon = (index) => {
    const coupon = copies[index];
    setDiscountCode(coupon.code);
    setCount(coupon.remaining);
    setDiscountPercent(coupon.discountPercent);
    setOrderCondition(coupon.orderCondition || '');
    setMaxUsesPerUser(coupon.maxUsesPerUser || 1); // Set max uses per user when editing
    setEditIndex(index);
  };

  const toggleCoupon = async (index) => {
    const couponToToggle = copies[index];
    const newEnabledState = !couponToToggle.enabled;
    
    try {
      if (couponToToggle.id) {
        // Update on server
        await axios.put(`${API_BASE_URL}/api/admin/coupons/${couponToToggle.id}`, {
          ...couponToToggle,
          enabled: newEnabledState
        });
      }
      
      setCopies(prev =>
        prev.map((coupon, i) =>
          i === index ? { ...coupon, enabled: newEnabledState } : coupon
        )
      );
    } catch (error) {
      console.error('Error toggling coupon:', error);
      alert('Failed to update coupon status. Please try again.');
    }
  };

  // Helper function to generate random code
  const generateRandomCode = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 12; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code.match(/.{1,4}/g).join("-");
  };

  // Generate coupon by value using random code
  const generateCouponByValue = async () => {
    if (discountAmountInput.trim() === '' || couponByValueCount < 1) return;
    
    // If editing, retain the original coupon code; otherwise, generate a new one
    const newCoupon = valueEditIndex !== null
      ? {
          ...valueCoupons[valueEditIndex],
          remaining: couponByValueCount,
          discountAmount: discountAmountInput.trim(),
          maxUsesPerUser: valueMaxUsesPerUser // Include max uses per user
        }
      : {
          code: generateRandomCode(),
          remaining: couponByValueCount,
          discountAmount: discountAmountInput.trim(),
          maxUsesPerUser: valueMaxUsesPerUser, // Include max uses per user
          enabled: false 
        };
    
    try {
      // Similar implementation to regular coupons, but with discountAmount property
      // Would implement API calls here if this feature is supported on the backend
      
      if (valueEditIndex !== null) {
        setValueCoupons(prev =>
          prev.map((coupon, i) => (i === valueEditIndex ? newCoupon : coupon))
        );
        setValueEditIndex(null);
      } else {
        setValueCoupons(prev => [...prev, newCoupon]);
      }
      
      setDiscountAmountInput('');
      setCouponByValueCount(1);
      setValueMaxUsesPerUser(1);
    } catch (error) {
      console.error('Error generating value coupon:', error);
      alert('Failed to save coupon. Please try again.');
    }
  };

	return (<>
	
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Discount Generator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Coupon Name</label>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter coupon name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Coupon Count (Max uses)</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          min={1}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* New field: Max Uses Per User */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Max Uses Per User (limit how many times a single user can use this coupon)
        </label>
        <input
          type="number"
          value={maxUsesPerUser}
          onChange={(e) => setMaxUsesPerUser(Number(e.target.value))}
          min={1}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Discount Percentage (%)</label>
        <input
          type="text"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="Enter discount %"
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Order Condition Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Order Condition (coupon applies only if order total ≤ this value)
        </label>
        <input
          type="number"
          value={orderCondition}
          onChange={(e) => setOrderCondition(e.target.value)}
          placeholder="e.g., 999"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={generateCoupon}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editIndex !== null ? 'Update Coupon' : 'Generate Coupon'}
      </button>
      
      {copies.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Created Coupons:</h3>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-2 border border-gray-200">Coupon Code</th>
                <th className="p-2 border border-gray-200">Remaining</th>
                <th className="p-2 border border-gray-200">Discount %</th>
                <th className="p-2 border border-gray-200">Per User</th>
                <th className="p-2 border border-gray-200">Order Condition</th>
                <th className="p-2 border border-gray-200">Enabled</th>
                <th className="p-2 border border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {copies.map((coupon, index) => (
                <tr key={index} className="border border-gray-200">
                  <td className="p-2 border border-gray-200">{coupon.code}</td>
                  <td className="p-2 border border-gray-200">{coupon.remaining}</td>
                  <td className="p-2 border border-gray-200">{coupon.discountPercent}</td>
                  <td className="p-2 border border-gray-200">{coupon.maxUsesPerUser || 1}x</td>
                  <td className="p-2 border border-gray-200">{coupon.orderCondition || '-'}</td>
                  <td className="p-2 border border-gray-200">{coupon.enabled ? 'Yes' : 'No'}</td>
                  <td className="p-2 border border-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editCoupon(index)}
                        className="px-2 py-1 rounded border text-sm border-yellow-500 text-yellow-500 hover:bg-yellow-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCoupon(index)}
                        className="px-2 py-1 rounded border text-sm border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleCoupon(index)}
                        className="px-2 py-1 rounded border text-sm border-gray-500 text-gray-500 hover:bg-gray-50"
                      >
                        {coupon.enabled ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Generate Coupon by Value Section */}
      <div className="mt-8 p-4 border-t">
        <h2 className="text-xl font-bold mb-4">Generate Coupon by Value</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Discount Amount (e.g., 799)</label>
          <input
            type="text"
            value={discountAmountInput}
            onChange={(e) => setDiscountAmountInput(e.target.value)}
            placeholder="Enter discount amount"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Coupon Count (Max uses)</label>
          <input
            type="number"
            value={couponByValueCount}
            onChange={(e) => setCouponByValueCount(Number(e.target.value))}
            min={1}
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* New field: Max Uses Per User for value coupons */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Max Uses Per User (limit how many times a single user can use this coupon)
          </label>
          <input
            type="number"
            value={valueMaxUsesPerUser}
            onChange={(e) => setValueMaxUsesPerUser(Number(e.target.value))}
            min={1}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          onClick={generateCouponByValue}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Generate Random Coupon by Value
        </button>
        
        {valueCoupons.length > 0 && (
          <div className="mt-4">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-200">Coupon Code</th>
                  <th className="p-2 border border-gray-200">Discount Amount</th>
                  <th className="p-2 border border-gray-200">Remaining</th>
                  <th className="p-2 border border-gray-200">Per User</th>
                  <th className="p-2 border border-gray-200">Enabled</th>
                  <th className="p-2 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {valueCoupons.map((coupon, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="p-2 border border-gray-200">{coupon.code}</td>
                    <td className="p-2 border border-gray-200">{coupon.discountAmount}</td>
                    <td className="p-2 border border-gray-200">{coupon.remaining}</td>
                    <td className="p-2 border border-gray-200">{coupon.maxUsesPerUser || 1}x</td>
                    <td className="p-2 border border-gray-200">{coupon.enabled ? 'Yes' : 'No'}</td>
                    <td className="p-2 border border-gray-200">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setValueEditIndex(index);
                            setDiscountAmountInput(coupon.discountAmount);
                            setCouponByValueCount(coupon.remaining);
                            setValueMaxUsesPerUser(coupon.maxUsesPerUser || 1);
                          }}
                          className="px-2 py-1 rounded border text-sm border-blue-500 text-blue-500 hover:bg-blue-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setValueCoupons(prev =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="px-2 py-1 rounded border text-sm border-red-500 text-red-500 hover:bg-red-50"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            setValueCoupons(prev =>
                              prev.map((coupon, i) =>
                                i === index ? { ...coupon, enabled: !coupon.enabled } : coupon
                              )
                            )
                          }
                          className="px-2 py-1 rounded border text-sm border-gray-500 text-gray-500 hover:bg-gray-50"
                        >
                          {coupon.enabled ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
	</div >
			</>
  );
};

export default DiscountGenerator;