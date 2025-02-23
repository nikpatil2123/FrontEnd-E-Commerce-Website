import React, { useState } from 'react';

const DiscountGenerator = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [count, setCount] = useState(1);
  const [copies, setCopies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // New state for coupon-by-value section
  const [valueCoupons, setValueCoupons] = useState([]);
  // NEW STATE for coupon-by-value inputs:
  const [discountAmountInput, setDiscountAmountInput] = useState('');
  const [couponByValueCount, setCouponByValueCount] = useState(1);

  const generateCoupon = () => {
    if (discountCode.trim() === '' || count < 1) return;
    const newCoupon = { code: discountCode.trim(), remaining: count, enabled: false };
    if (editIndex !== null) {
      setCopies(prev =>
        prev.map((coupon, i) => (i === editIndex ? newCoupon : coupon))
      );
      setEditIndex(null);
    } else {
      setCopies(prev => [...prev, newCoupon]);
    }
    // Clear inputs after generating
    setDiscountCode('');
    setCount(1);
  };

  const deleteCoupon = (index) => {
    setCopies(prev => prev.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  const editCoupon = (index) => {
    const coupon = copies[index];
    setDiscountCode(coupon.code);
    setCount(coupon.remaining);
    setEditIndex(index);
  };

  const toggleCoupon = (index) => {
    setCopies(prevCopies =>
      prevCopies.map((coupon, i) =>
        i === index ? { ...coupon, enabled: !coupon.enabled } : coupon
      )
    );
  };

  const saveCouponsToLocalStorage = () => {
    localStorage.setItem('coupons', JSON.stringify(copies));
    alert('Coupons saved to local storage!');
  };

  // Helper function to generate random code
  const generateRandomCode = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 12; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    // Format as "XXXX-XXXX-XXXX"
    return code.match(/.{1,4}/g).join("-");
  };

  // New: generate coupon by value using random code
  const generateCouponByValue = () => {
    if (discountAmountInput.trim() === '' || couponByValueCount < 1) return;
    const newCoupon = { 
      code: generateRandomCode(), 
      remaining: couponByValueCount, 
      discountAmount: discountAmountInput.trim(), 
      enabled: false 
    };
    setValueCoupons(prev => [...prev, newCoupon]);
    setDiscountAmountInput('');
    setCouponByValueCount(1);
  };

  return (
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
      <button
        onClick={generateCoupon}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editIndex !== null ? 'Update Coupon' : 'Generate Coupon'}
      </button>
      <button
        onClick={saveCouponsToLocalStorage}
        className="bg-green-500 text-white px-4 py-2 rounded ml-4"
      >
        Save Coupons
      </button>
      
      {copies.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Created Coupons:</h3>
          <ul className="list-disc ml-4 space-y-2">
            {copies.map((coupon, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>
                  {coupon.code} - Remaining: {coupon.remaining}
                </span>
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
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* New Section: Generate Coupon by Value */}
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
        <button
          onClick={generateCouponByValue}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Generate Random Coupon by Value
        </button>

        {valueCoupons.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Coupons by Value:</h3>
            <ul className="list-disc ml-4 space-y-2">
              {valueCoupons.map((coupon, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>
                    {coupon.code} - Discount: {coupon.discountAmount} - Remaining: {coupon.remaining}
                  </span>
                  {/* Optionally add edit, delete, toggle buttons for value coupons */}
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountGenerator;