import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    phone: '',
    sex: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      setPasswordTouched(true);
      checkPasswordStrength(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const calculateMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z]+$/;
    const phonePattern = /^[0-9]+$/;

    if (!namePattern.test(formData.firstName)) {
      newErrors.firstName = 'First name must contain only letters';
    }

    if (!namePattern.test(formData.lastName)) {
      newErrors.lastName = 'Last name must contain only letters';
    }

    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain only digits';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match';
    }

    if (passwordStrength !== 'Strong') {
      newErrors.passwordStrength = 'Password must be strong to register';
      alert('Your password is not strong enough. Please ensure it is at least 8 characters long and includes letters, numbers, and special characters.');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        navigate('/login'); // Redirect to login page
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    }
  };
  

  const checkPasswordStrength = (password) => {
    let strength = 'Weak';
    const strongPasswordPattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
    );

    if (strongPasswordPattern.test(password)) {
      strength = 'Strong';
    } else if (password.length >= 6) {
      strength = 'Good';
    }

    setPasswordStrength(strength);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Registration</h2>

        <div className="mb-6 flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <label htmlFor="firstName" className="block mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="border p-3 w-full rounded focus:outline-none"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label htmlFor="lastName" className="block mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="border p-3 w-full rounded focus:outline-none"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 w-full rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-6 flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <label htmlFor="phone" className="block mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="border p-3 w-full rounded focus:outline-none"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label htmlFor="dob" className="block mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              max={calculateMaxDate()}
              placeholder="Date of Birth"
              onChange={handleChange}
              className="border p-3 w-full rounded focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 w-full rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-6 flex flex-wrap -mx-2 relative">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0 relative">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border p-3 w-full rounded focus:outline-none"
              required
            />
            <span className="absolute right-3 top-12 cursor-pointer" onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
            {passwordTouched && (
              <>
                <p className={`text-sm mt-1 ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Good' ? 'text-yellow-500' : 'text-green-500'}`}>
                  Password strength: {passwordStrength}
                </p>
              </>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2 relative">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="border p-3 w-full rounded focus:outline-none"
              required
            />
            <span className="absolute right-3 top-12 cursor-pointer" onClick={togglePasswordVisibility}>
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>

        {passwordTouched && (
          <p className="text-sm text-gray-500">
            Password must be at least 8 characters long and include letters, numbers, and special characters.
          </p>
        )}

        <div className="mb-6">
          <label className="block mb-2">Sex</label>
          <label className="mr-4">
            <input
              type="radio"
              name="sex"
              value="Male"
              onChange={handleChange}
              className="mr-2 focus:outline-none"
              required
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="Female"
              onChange={handleChange}
              className="mr-2 focus:outline-none"
              required
            /> Female
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 w-full rounded hover:bg-blue-600 transition duration-200 focus:outline-none"
          disabled={passwordStrength !== 'Strong'}
        >
          Register
        </button>
        {errors.passwordStrength && <p className="text-red-500 text-sm mt-2">{errors.passwordStrength}</p>}
        <p className="mt-6 text-center">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
      </form>
    </div>
  );
};

export default RegistrationForm;