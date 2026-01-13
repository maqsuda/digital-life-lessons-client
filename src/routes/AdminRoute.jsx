import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (role != "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
