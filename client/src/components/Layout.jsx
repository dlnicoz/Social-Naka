// src/components/Layout.jsx
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Layout;
