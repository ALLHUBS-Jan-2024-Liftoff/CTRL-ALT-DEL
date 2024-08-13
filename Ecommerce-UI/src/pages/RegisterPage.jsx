import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../services/axiosService";

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axiosInstance.post('/register', formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
    if(error.response) {
       setMessage(error.response.data.message);
    } else {
      setMessage(error.message);
    }
    }
  };
  


return (
  <div>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="verifyPassword">Verify Password:</label>
        <input
          type="password"
          name="verifyPassword"
          value={formData.verifyPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name= "firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
    {message && <p>{message}</p>}
    <p>
      Already have an account? <a href="/login">Login</a>
    </p>
  </div>
  );
};

export default RegisterPage;
