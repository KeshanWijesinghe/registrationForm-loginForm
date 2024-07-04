import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      if (formErrors.email && formErrors.password) {
        alert('Invalid email address and password must be at least 6 characters long');
      } else if (formErrors.email) {
        alert('Invalid email address');
      } else if (formErrors.password) {
        alert('Password must be at least 6 characters long');
      }
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login successful');
        navigate('/profile'); // Redirect to profile page or another page
      } else {
        setErrors({ general: data.message });
        setFormData({ ...formData, password: '' }); // Clear the password field
        alert(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setErrors({ general: 'An error occurred. Please try again.' });
      setFormData({ ...formData, password: '' }); // Clear the password field
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 w-full rounded focus:outline-none"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 w-full rounded focus:outline-none"
            required
          />
          <span className="absolute right-3 top-12 cursor-pointer" onClick={togglePasswordVisibility}>
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 w-full rounded hover:bg-blue-600 transition duration-200 focus:outline-none"
        >
          Login
        </button>

        <p className="mt-6 text-center">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
      </form>
    </div>
  );
};

export default LogInForm;