import React, { useState } from 'react';
import LayoutAdmins from '../layouts/LayoutAdmins';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name : "Administrator",
        email: "adm@example.com",
        phone: "123-456-7890",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile:", formData);
    };
    return (
        <LayoutAdmins>
            <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="firstName" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>   
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">Save Changes</button>
            </form>
        </div>
        </LayoutAdmins>
    );
};

export default ProfilePage;
