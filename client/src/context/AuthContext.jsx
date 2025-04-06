import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasSocialCard, setHasSocialCard] = useState(false); 
  const [profileUrlName, setProfileUrlName] = useState(null);
  
  const checkSocialCard = async (userId) => {
    const { data, error } = await supabase
      .from("social_cards")
      .select("slug") // 🔄 id → slug (to also get profileUrlName)
      .eq("user_id", userId)
      .single();

    if (data) {
      setHasSocialCard(true);
      setProfileUrlName(data.slug);
    } else {
      setHasSocialCard(false);
      setProfileUrlName(null);
    }
  };

  // 🔐 LOGIN FUNCTION
  const login = async ({ username, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) throw error;
    setUser({ ...data.user });
    await checkSocialCard(data.user.id); // ✅ check right after login
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    if (error) console.error("Google Sign-In Error:", error);
    return data;
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Logout Error:", err.message); // don't block UI
    } finally {
      // yeh hamesha chalega
      setUser(null);
      setHasSocialCard(false);
      setProfileUrlName(null);
      console.log("User successfully logged out ✅");
    }
  };
  

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser({ ...session.user });
        await checkSocialCard(session.user.id); // ✅ centralize logic
      } else {
        setUser(null);
        setHasSocialCard(false);
        setProfileUrlName(null);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        if (session?.user) {
          setUser({ ...session.user });
          await checkSocialCard(session.user.id); // ✅ also check here
        } else {
          setUser(null);
          setHasSocialCard(false);
          setProfileUrlName(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        signInWithGoogle,
        profileUrlName,
        hasSocialCard,
        setHasSocialCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
