import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Atom } from "lucide-react";
import AuthSideImage from "../components/AuthSideImage";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../components/Toast/ToastContainer";
import GoogleButton from "../components/GoogleButton";
import supabase from '../utils/supabase'; // ✅ Named + Default Import



const Signup = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePasswordValidation = () => {
    setPasswordsMatch(values.password === values.confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPasswordsMatch(true);

    if (values.password !== values.confirmPassword) {
      setPasswordsMatch(false);
      setIsSubmitting(false);
      addToast("Passwords do not match", "error");
      return;
    }

    try {
      // 🛠 Supabase Sign-Up
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { name: values.name }, // Store additional user info
          email_confirm: process.env.NODE_ENV === "development", // Auto-confirm in dev
        },
      });

      if (error) throw error;

      addToast("Registration successful! Check your email for verification.", "success");
      navigate("/login"); // Redirect to login
    } catch (err) {
      addToast(err.message || "An unexpected error occurred", "error");
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

            {/* Error Messages */}
            <div className="custom-error-msg">
              {!passwordsMatch && <p className="text-red-500">Passwords do not match</p>}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Input */}
              <GoogleButton text="Sign up with Google" ClickFun={signInWithGoogle} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
              <div>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Full Name"
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
                  placeholder="Email: example@gmail.com"
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
                  onBlur={handlePasswordValidation}
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
                {isSubmitting ? "Signing up..." : "Create account"}
              </button>
            </form>

            {/* Link to Log In Page */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
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

      {/* Toast Messages */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default Signup;
