import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  // Dummy stats
  const stats = [
    {
      title: "Total Products",
      value: 120,
      icon: <FaBox className="text-blue-500" />,
    },
    {
      title: "Total Sales",
      value: 540,
      icon: <FaShoppingCart className="text-green-500" />,
    },
    {
      title: "Total Revenue",
      value: "24,500",
      icon: <FaDollarSign className="text-yellow-500" />,
    },
    {
      title: "Total Users",
      value: 320,
      icon: <FaUsers className="text-red-500" />,
    },
  ];

  return (
    <section className="p-2">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-gray-600">{stat.title}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
