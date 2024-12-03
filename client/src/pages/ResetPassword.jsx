import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useToast } from '../hooks/useToast'; // Import the useToast hook
import ToastContainer from '../components/Toast/ToastContainer'; // Import ToastContainer

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Retrieve token from query params
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenValid, setTokenValid] = useState(false); // State to track token validity
  const { toasts, addToast, removeToast } = useToast(); // Get toasts and addToast

  const [error, setError] = useState('');

  useEffect(() => {
    // Validate token on page load
    axiosInstance
      .get(`/users/validate-reset-token?token=${token}`)
      .then(() => setTokenValid(true))
      .catch(() => {
        setError('Invalid or expired reset link.');
        addToast('Invalid or expired reset link.', 'error'); // Show toast on error
      });
  }, [token, addToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      addToast('Passwords do not match.', 'error'); // Show toast on password mismatch
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await axiosInstance.post('/users/reset-password', { token, newPassword: password });
      addToast('Password reset successful! You can now log in.', 'success'); // Success toast
      window.location = '/login'; // Redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
      addToast(err.response?.data?.message || 'Something went wrong.', 'error'); // Error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tokenValid && !error) {
    return <div>Loading...</div>; // Show loading while token is being validated
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        {tokenValid && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isSubmitting ? 'Submitting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>

      {/* Add Toast Container to render toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ResetPassword;
