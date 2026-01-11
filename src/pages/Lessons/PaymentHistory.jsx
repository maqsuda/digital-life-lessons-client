import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NavLink } from "react-router";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myLessons = [], refetch } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      // const res = await axiosSecure.get(`/payments`);
      //   console.log(user?.isPremium);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold pt-5 text-center">
        Payments History : {myLessons.length}
      </h2>

      <div className="overflow-x-auto px-5">
        <table className="table table-zebra text-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Customer Email</th>
              <th>Name</th>
              {/* <th>Premium</th> */}
              <th>Price</th>
              {/* <th>Privacy</th> */}
              <th>Access Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {myLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.email}</td>
                <td>{lesson.displayName}</td>
                {/* <td>{user.isPremium}</td> */}
                <td>{lesson.price}</td>
                {/* <td>{lesson.privacy}</td> */}
                <td>{lesson.accessLevel}</td>
                <td className="w-[150px]">
                  <button
                    className="btn btn-xs hover:bg-primary hover:text-white "
                    title="Details View"
                  >
                    <FaMagnifyingGlass />
                  </button>
                  <NavLink to={``}>
                    <button
                      className="btn btn-xs hover:bg-primary hover:text-white"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                  </NavLink>
                  <button
                    // onClick={() => handleLessonDelete(lesson._id)}
                    className="btn btn-xs hover:bg-primary hover:text-white"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
