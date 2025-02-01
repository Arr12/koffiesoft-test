import React, { useState } from "react";
import API from '../utils/Api';

export default function Auth({ setLoading, setModal }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading();

    try {
      const response = await API.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading();

    try {
      await API.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      window.location.href = '/authentication';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isRegister ? "Create an Account" : "Sign In"}
        </h2>

        {/* Toggle between Login and Register */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              !isRegister ? "bg-orange-500 text-white" : "text-gray-500"
            }`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              isRegister ? "bg-orange-500 text-white" : "text-gray-500"
            }`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {isRegister && (
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition">
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
