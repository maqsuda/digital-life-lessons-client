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
      <h2 className="text-2xl font-bold pt-5 text-center">
        My Lessons : {myLessons.length}
      </h2>

      <div className="overflow-x-auto px-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Privacy</th>
              <th>Access Level</th>
            </tr>
          </thead>
          <tbody>
            {myLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.title}</td>
                <td>{lesson.description}</td>
                <td>{lesson.category}</td>
                <td>{lesson.emotionalTone}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.accessLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLessons;
