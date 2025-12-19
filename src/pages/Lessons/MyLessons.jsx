import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myLessons = [] } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>My Lessons {myLessons.length}</h2>
    </div>
  );
};

export default MyLessons;
