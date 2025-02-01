import React, { useState, useEffect } from "react";
import LayoutAdmins from "../layouts/LayoutAdmins";
import API from "../utils/Api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalActivity: 0,
      });
    
      const [recentActivity, setRecentActivity] = useState([]);
      const [users, setUsers] = useState([]);
    
      // Fetch Dashboard Data
      const fetchDashboardData = async () => {
        try {
          const response = await API.get("/dashboard"); // Adjust API route
          setStats(response.data.stats);
          setRecentActivity(response.data.recentActivity);
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };
    
      useEffect(() => {
        fetchDashboardData();
      }, []);
    
  return (
    <LayoutAdmins>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Total Activity</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalActivity}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 overflow-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-4">
            {recentActivity?.map((activity, index) => (
            <li key={index} className="py-3 text-gray-600">
                {activity}
            </li>
            ))}
        </ul>
      </div>

      {/* Tables Section */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Data</h2>
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-800">Name</th>
              <th className="px-4 py-2 text-gray-800">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
                user.email != 'adm@example.com' && (
                    <tr key={index} className="border-t">
                        <td className="p-3 border">{user.name}</td>
                        <td className="p-3 border">{user.email}</td>
                    </tr>
                )
            ))}
          </tbody>
        </table>
      </div>
    </LayoutAdmins>
  );
};

export default Dashboard;
