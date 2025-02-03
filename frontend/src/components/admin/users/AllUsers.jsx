import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../utils/helper.js";
import moment from "moment";
import { Link } from "react-router";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllUsers() {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/user/all-users`);
      setAllUsers(response.data.data);
        console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl text-gray-600 font-semibold animate-pulse">
          Loading All Customers...
        </h1>
      </div>
    );
  }

  return (
    <section className="overflow-y-auto">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-medium  my-4 leading-6 text-gray-700 text-center">
        All Users
      </h2>
      <div>
        {/* Dashboard data */}
        <div className="bg-white overflow-auto">
          <table className="table-auto w-full text-sm sm:text-base">
            <thead className="bg-gray-300 text-gray-800 text-center">
              <tr>
                <th className="py-2 px-4 border">S/N</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Account Type</th>
                <th className="py-2 px-4 border">Date Joined</th>
                <th className="py-2 px-4 border">More Details</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((item, index) => {
                return (
                  <tr
                    className="text-sm sm:text-base text-gray-800 hover:bg-gray-50 hover:text-black"
                    key={item._id}
                  >
                    <td className="py-2 px-4 border text-center font-medium">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border capitalize">{item.name}</td>
                    <td className="py-2 px-4 border">{item.email}</td>
                    <td className="py-2 px-4 border">{item.userType}</td>
                    <td className="py-2 px-4 border">
                      {moment(new Date(item.createdAt)).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <Link
                        to={`/admin/user/${item._id}`}
                        className="bg-sky-600 text-white p-2 rounded-md cursor-pointer"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
