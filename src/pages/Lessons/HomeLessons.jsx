import React from "react";

const HomeLessons = () => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-center py-5 underline">User Dashboard</h2>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Total lessons</th>
            <th>Total saved</th>
            <th>Recently added lessons</th>
            <th>Quick shortcuts to important actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomeLessons;
