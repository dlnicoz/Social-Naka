import React, { useState } from 'react';
import { useToast } from '../hooks/useToast'; // Import useToast hook
import ToastContainer from '../components/Toast/ToastContainer'; // Import ToastContainer

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, addToast, removeToast } = useToast(); // Get toasts and addToast

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Request Password Reset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Request Reset'}
          </button>
        </form>
      </div>

      {/* Add Toast Container to render toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default RequestResetPassword;
