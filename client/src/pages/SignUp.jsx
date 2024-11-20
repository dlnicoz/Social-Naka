import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Atom } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance'; // Import axios instance
import AuthSideImage from '../components/AuthSideImage';

const Signup = () => {
  const [values, setValues] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [userExists, setUserExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Validate password match
  const handlePasswordValidation = () => {
    setPasswordsMatch(values.password === values.confirmPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUserExists(false);
    setEmailExists(false);
    setPasswordsMatch(true);

    if (values.password !== values.confirmPassword) {
      setPasswordsMatch(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axiosInstance.post('/users/register', values); // Use axiosInstance for signup request
      // Save the token and username from the response
      localStorage.setItem('auth-token', res.data.token);
      localStorage.setItem('username', res.data.username);
      alert('Registration successful!');
      window.location = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      const error = err.response?.data || 'Unknown error';
      if (error === 'Email already exists') {
        setEmailExists(true);
      } else if (error === 'Username already exists') {
        setUserExists(true);
      } else {
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex xl:flex-row relative">
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12 lg:h-6 z-50 flex items-center gap-1">
          <span className="text-2xl font-bold">SocialNaka</span>
          <Atom className="text-blue-400" size={24} />
        </div>

        <div className="relative flex w-full lg:py-[var(--lg)] lg:px-4 xl:p-8 xl:pb-4 xl:w-[calc(100vw-52%)] min-h-screen justify-center">
          <div className="w-full max-w-md space-y-8 pt-20">
            <div>
              <h1 className="text-5xl font-black">Create your account</h1>
            </div>

            {/* Error Message Display */}
            <div className="custom-error-msg">
              {userExists && <p className="text-red-500">Username already exists</p>}
              {emailExists && <p className="text-red-500">Email already exists</p>}
              {!passwordsMatch && <p className="text-red-500">Passwords do not match</p>}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email: link@gmail.com"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Password Input */}
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
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <Eye className="text-gray-400" size={20} />
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handlePasswordValidation} // Validate on blur
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  <Eye className="text-gray-400" size={20} />
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                {isSubmitting ? 'Signing up...' : 'Create account'}
              </button>
            </form>

            {/* Link to Log In Page */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Image/Side Component */}
        <AuthSideImage
          imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
          overlayColor="bg-amber-50"
        />
      </div>
    </>
  );
};

export default Signup;
