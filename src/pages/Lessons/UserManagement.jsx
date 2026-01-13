import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserMinus, FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: userInfo = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleAdmin = { role: "admin" };
    //conformation message
    axiosSecure.patch(`/users/${user}/role`, roleAdmin).then((res) => {
      refetch();
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${userInfo.displayName} marked as a Admin`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleAdmin = { role: "user" };
    //conformation message
    axiosSecure.patch(`/users/${user}/role`, roleAdmin).then((res) => {
      refetch();
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.data.displayName} marked as a User`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center underline pt-5">
        Users Management
      </h2>

      <div className="px-2">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-sm bg-red-400"
                    >
                      <FaUserMinus></FaUserMinus>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm bg-green-600"
                    >
                      <FaUserPlus></FaUserPlus>
                    </button>
                  )}
                </td>
                <td>Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
