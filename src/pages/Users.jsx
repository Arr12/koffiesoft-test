import React, { useState, useEffect } from "react";
import LayoutAdmins from "../layouts/LayoutAdmins";
import axios from "axios";
import API from "../utils/Api";

const API_URL = "http://localhost:8000/api/v1/users";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setUsers(response.data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Create / Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      if (editingUserId) {
        // Update user (password is optional)
        const updateData = { name: formData.name, email: formData.email };
        if (formData.password) updateData.password = formData.password;

        await API.post(`${API_URL}/${editingUserId}`, updateData);
      } else {
        // Create user
        await API.post(API_URL, formData);
      }

      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }

    setLoading(false);
  };

  // Handle Edit Click
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  // Handle Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setLoading(false);
  };

  // Reset Form
  const resetForm = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", password: "", password_confirmation: "" });
  };

  // Filter Users
  const filteredUsers = users?.data?.filter(
    (user) =>
      (user.name || "")
        .toLowerCase()
        .includes((search || "").toString().toLowerCase()) ||
      (user.email || "")
        .toLowerCase()
        .includes((search || "").toString().toLowerCase())
  );

  return (
    <LayoutAdmins>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* User Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 shadow rounded-lg"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (leave blank to keep current)"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            autoComplete="new-password"
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Retype Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editingUserId ? "Update User" : "Create User"}
        </button>
        {editingUserId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers?.length > 0 ? (
              filteredUsers?.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-2 py-1 text-white rounded"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M21 21H12"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-2 py-1 text-white rounded"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12V17"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14 12V17"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4 7H20"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LayoutAdmins>
  );
};

export default UserPage;
