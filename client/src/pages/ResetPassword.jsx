// ✅ Supabase-Integrated ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/Toast/ToastContainer';
import supabase from '../utils/supabase';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setIsReady(true);
      else addToast("Invalid or expired link. Please try again.", "error");
    };
    init();
  }, [addToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast("Passwords do not match.", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      addToast("Password updated! You can now log in.", "success");
    } catch (err) {
      addToast(err.message || "Something went wrong.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReady) return <div className="text-center mt-12">Validating token...</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
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
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ResetPassword;
