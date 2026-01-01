import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myLessons = [], refetch } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons?email=${user.email}`);
      return res.data;
    },
  });

  const handleLessonDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-lessons/${id}`).then((res) => {
          // axiosSecure.delete(`/my-lessons/${id}`).then((res) => {
          console.log("Data is :", res.data);

          if (res.data.deletedCount) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your lesson has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold pt-5 text-center">
        My Lessons : {myLessons.length}
      </h2>

      <div className="overflow-x-auto px-5">
        <table className="table table-zebra text-xs">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {myLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.title}</td>
                <td>{lesson.description}</td>
                <td>{lesson.category}</td>
                <td>{lesson.emotionalTone}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.accessLevel}</td>
                <td className="w-[150px]">
                  <button
                    className="btn btn-xs hover:bg-primary hover:text-white "
                    title="Details View"
                  >
                    <FaMagnifyingGlass />
                  </button>
                  <NavLink to={`/dashboard/edit-lesson/${lesson._id}`}>
                    <button
                      className="btn btn-xs hover:bg-primary hover:text-white"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleLessonDelete(lesson._id)}
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

export default MyLessons;
