import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Atom } from 'lucide-react';
import  {useAuth}  from '../context/AuthContext';
import AuthSideImage from '../components/AuthSideImage';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/Toast/ToastContainer';
import GoogleButton from '../components/GoogleButton';
import supabase from '../utils/supabase'; 


const Login = () => {
  const [values, setValues] = useState({ username: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addToast, toasts, removeToast } = useToast();
  const { user , setUser ,login ,signInWithGoogle } = useAuth(); // ✅ Ensure useAuth() is inside AuthProvider
  console.log(user); // Debugging Purpose  

  
  // Input Change Handler
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // 🔹 Google Sign-In with Context Update
  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await signInWithGoogle();
      if (error) throw error;

      const user = data?.user;
      if (user) {
        setUser(user); // ✅ Update AuthContext state
        addToast('Google Sign-In Successful!', 'success');
        // navigate('/dashboard');
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      addToast('Google Sign-In Failed!', 'error');
    }
  };

  // 🔹 Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(values); // ✅ Context API ka login function use ho raha hai
      addToast('Login Successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      const error = err.response?.data || 'Unknown error';
      addToast(error, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log("User from getUser():", data);
    };

    checkUser();
  }, []);

  return (
    <>
      <div className="flex xl:flex-row relative">
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12 lg:h-6 z-50 flex items-center gap-1">
          <Link to='/'> <span className="text-2xl font-bold">SocialNaka</span></Link>
          <Atom className="text-blue-400" size={24} />
        </div>
        <div className="relative flex w-full lg:py-[var(--lg)] lg:px-4 xl:p-8 xl:pb-4 xl:w-[calc(100vw-52%)] min-h-screen justify-center">
          <div className="w-full max-w-md space-y-8 pt-32">
            <h1 className="text-5xl font-black">Log in to your SocialNaka</h1>

            {/* Google Sign-In */}
            <GoogleButton text="Sign in with Google" ClickFun={handleGoogleSignIn} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Normal Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="Username or Email"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

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

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <p className="text-center text-gray-600">
              Forgot your password? <Link to="/request-reset" className="text-blue-600 hover:underline">Reset Password</Link>
            </p>

            <p className="!mt-2 text-center text-gray-600">
              Don't have an account? <Link to="/signup" className="text-purple-600 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>

        <AuthSideImage imageUrl="https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=1920&auto=format&fit=crop" overlayColor="bg-purple-100" />
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default Login;
