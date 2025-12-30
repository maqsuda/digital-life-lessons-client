import React from "react";
import Logo from "../logo/Logo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import Lesson from "./Lesson";

const Lessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: lessonInfo } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allLessons`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-base-100 rounded-2xl my-2 px-5">
      <h2 className="py-5 text-3xl text-center font-bold">All Lesson </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {lessonInfo.map((lesson) => (
          <Lesson key={lesson._id} lesson={lesson}></Lesson>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
