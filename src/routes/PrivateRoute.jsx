import React from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigator to="/login"></Navigator>;
  }

  return children;
};

export default PrivateRoute;
