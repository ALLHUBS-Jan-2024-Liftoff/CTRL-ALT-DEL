import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosService';


const LoginPage = ({setIsLoggedIn}) => {

  

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await axiosInstance.post('/login', formData);
      setMessage(response.data.message);
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        navigate('/products');
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <p>
              Don't have an account yet? <a href="/register">Register</a>
            </p>
    </div>
  );
};

export default LoginPage;