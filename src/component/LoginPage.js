import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9630/api/login', {
        email,
        password,
      });
      // console.log(response.data['email'])
      if (response.data !== null) {
        console.log("Response by server : "+response.data);
        const id = response.data;
        navigate(`/home`,{state: { id } });
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const formStyle = {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle} className="main_div">
        <div>
        <form style={formStyle}>
        <input
          style={inputStyle}
          id="filled-basic"
          label="Username"
          variant="filled"
          margin="normal"
          placeholder='Username'
          value={email}
          onChange={handleUsernameChange}
        />
        <br />
        <input
          style={inputStyle}
          id="standard-password-input"
          label="Password"
          type="password"
          placeholder='Password'
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <br />
        <button
          style={buttonStyle}
          type="submit"
          onClick={handleLogin}
          onMouseOver={() => buttonHoverStyle}
          onMouseOut={() => ({})}
        >
          Submit
        </button>
      </form>
  
        </div>      
    </div>
  );
};

export default LoginPage;
