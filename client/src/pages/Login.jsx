import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Atom } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import AuthSideImage from '../components/AuthSideImage';
import { useToast } from '../hooks/useToast'; // Import useToast hook
import ToastContainer from '../components/Toast/ToastContainer'; // Import ToastContainer

const Login = () => {
  const [values, setValues] = useState({ username: '', password: '' });
  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { toasts, addToast, removeToast } = useToast(); // Get toasts and addToast

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUserNotFound(false);
    setWrongPassword(false);

    try {
      const res = await axiosInstance.post('/users/login', values);

      // Save tokens in storage/cookie
      localStorage.setItem('auth-token', res.data.accessToken);
      document.cookie = `refreshToken=${res.data.refreshToken}; path=/; HttpOnly`;

      localStorage.setItem('username', res.data.username);

      // Use toast instead of alert
      addToast('Login successful!', 'success');
      window.location = '/dashboard';
    } catch (err) {
      const error = err.response?.data || 'Unknown error';
      if (error === 'Username/Email not found') {
        setUserNotFound(true);
        addToast('Username/Email not found', 'error'); // Add error toast
      } else if (error === 'Invalid password') {
        setWrongPassword(true);
        addToast('Invalid password', 'error'); // Add error toast
      } else {
        console.error(error);
        addToast('An unexpected error occurred', 'error'); // Add generic error toast
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex xl:flex-row relative">
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12 lg:h-6 z-50 flex items-center gap-1">
          <Link to='/'>   <span className="text-2xl font-bold">SocialNaka</span></Link>
          <Atom className="text-blue-400" size={24} />
        </div>
        <div className="relative flex w-full lg:py-[var(--lg)] lg:px-4 xl:p-8 xl:pb-4 xl:w-[calc(100vw-52%)] min-h-screen justify-center">
          <div className="w-full max-w-md space-y-8 pt-32">
            <div>
              <h1 className="text-5xl font-black">Log in to your SocialNaka</h1>
            </div>

            {/* Error Message Display */}
            <div className="custom-error-msg">
              {userNotFound && <p className="text-red-500">Username/Email not found</p>}
              {wrongPassword && <p className="text-red-500">Invalid Password</p>}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username or Email"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                  >
                    <Eye className="text-gray-400" size={20} />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            {/* Link to Forgot Password Page */}
            <p className="text-center text-gray-600">
              Forgot your password?{' '}
              <Link to="/request-reset" className="text-blue-600 hover:underline">
                Reset Password
              </Link>
            </p>

            {/* Link to Sign Up Page */}
            <p className="!mt-2 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Image/Side Component */}
        <AuthSideImage
          imageUrl="https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=1920&auto=format&fit=crop"
          overlayColor="bg-purple-100"
        />
      </div>

      {/* Add Toast Container to render toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default Login;
