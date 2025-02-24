import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', remaining: 1, enabled: false, orderCondition: '' });
  const [editingCoupon, setEditingCoupon] = useState(null);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Debug: Log newCoupon to ensure maxApplicableAmount is set correctly
    console.log('New Coupon Object:', newCoupon); // <-- add this log
    try {
      if (editingCoupon) {
        await axios.put(`http://localhost:5000/api/admin/coupons/${editingCoupon._id}`, newCoupon);
      } else {
        await axios.post('http://localhost:5000/api/admin/coupons', newCoupon);
      }
      fetchCoupons();
      resetForm();
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/coupons/${id}`);
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const resetForm = () => {
    setNewCoupon({ code: '', remaining: 1, enabled: false, orderCondition: '' });
    setEditingCoupon(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Coupon Code</label>
            <input
              type="text"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remaining Uses</label>
            <input
              type="number"
              value={newCoupon.remaining}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, remaining: Number(e.target.value) })
              }
              min={1}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Order Condition (discount applies only if order total ≤ this value)
            </label>
            <input
              type="number"
              value={newCoupon.orderCondition}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, orderCondition: e.target.value })
              }
              placeholder="e.g., 999"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium">Enabled</label>
            <input
              type="checkbox"
              checked={newCoupon.enabled}
              onChange={() => setNewCoupon({ ...newCoupon, enabled: !newCoupon.enabled })}
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
            </button>
            {editingCoupon && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Coupons List</h2>
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Coupon Code</th>
                <th className="px-4 py-2 text-left">Remaining</th>
                <th className="px-4 py-2 text-left">Condition</th>
                <th className="px-4 py-2 text-left">Enabled</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="border-b">
                  <td className="px-4 py-2">{coupon.code}</td>
                  <td className="px-4 py-2">{coupon.remaining}</td>
                  <td className="px-4 py-2">{coupon.orderCondition || '-'}</td>
                  <td className="px-4 py-2">{coupon.enabled ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setEditingCoupon(coupon);
                        setNewCoupon({
                          code: coupon.code,
                          remaining: coupon.remaining,
                          enabled: coupon.enabled,
                          orderCondition: coupon.orderCondition || ''
                        });
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CouponManagement;
