import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 // 🔐 LOGIN FUNCTION
 const login = async ({ username, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) throw error;
  setUser({ ...data.user });
};

const signInWithGoogle = async () => {
  const { data,error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      redirectTo: `${window.location.origin}/auth/callback`,
  });
  if (error) console.error("Google Sign-In Error:", error);
return data;
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message);
  } else {
    console.log('User successfully logged out ✅');
    setUser(null); // clear context
  }
};

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ ...session.user });
        // window.location.href = "/dashboard";
      } else {
        setUser(null);
      }
    };
  
    getUser();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event , session);
      if (session?.user) {
        setUser({ ...session.user }); 
      } else {
        setUser(null);
      }
    });
  
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser , login ,logout ,signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
