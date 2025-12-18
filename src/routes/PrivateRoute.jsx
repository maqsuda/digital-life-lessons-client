import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  if (!user) {
    return <Navigator to="/login"></Navigator>;
  }

  return children;
};

export default PrivateRoute;
