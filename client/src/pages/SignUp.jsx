import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Atom } from "lucide-react";
import AuthSideImage from "../components/AuthSideImage";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../components/Toast/ToastContainer";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../context/AuthContext";
import supabase from "../utils/supabase";
import SocialIcon from '../assets/socialnakaicon.png';


const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { toasts, addToast, removeToast } = useToast();
  const { signInWithGoogle, setUser } = useAuth();
  const navigate = useNavigate();

  // Passwords match live validation
  useEffect(() => {
    setPasswordsMatch(values.password === values.confirmPassword);
  }, [values.password, values.confirmPassword]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleGoogleSignUp = async () => {
    try {
      const { data, error } = await signInWithGoogle();
      if (error) throw error;

      const user = data?.user;
      if (user) {
        setUser(user);
        addToast("Google Sign-Up Successful!", "success");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google Sign-Up Error:", err);
      addToast("Google Sign-Up Failed!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!passwordsMatch) {
      addToast("Passwords do not match", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { name: values.name },
        },
      });

      if (error) throw error;

      addToast("Registration successful! Please verify your email.", "success");

      // Slight delay before redirect
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      addToast(err.message || "An unexpected error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex xl:flex-row relative">
        {/* Logo */}
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12 lg:h-6 z-50 flex items-center gap-1">
          <Link to='/'>
            <span className="flex items-center text-2xl font-bold">
              SocialNaka
              <img src={SocialIcon} alt="Social Icon" className="h-6 w-6 sm:h-8 sm:w-8 ml-2" />
            </span>
          </Link>

        </div>

        {/* Form Section */}
        <div className="relative flex w-full lg:py-[var(--lg)] lg:px-4 xl:p-8 xl:pb-4 xl:w-[calc(100vw-52%)] min-h-screen justify-center">
          <div className="w-full max-w-md space-y-8 pt-20">
            <h1 className="text-5xl font-black">Create your account</h1>

            {/* Google Sign Up */}
            <GoogleButton text="Sign up with Google" ClickFun={handleGoogleSignUp} />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Error */}
            {!passwordsMatch && <p className="text-red-500">Passwords do not match</p>}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email: example@gmail.com"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              {/* Password */}
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

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
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

            {/* Redirect to Login */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Side Image */}
        <AuthSideImage
          imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
          overlayColor="bg-amber-50"
        />
      </div>

      {/* Toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default Signup;
