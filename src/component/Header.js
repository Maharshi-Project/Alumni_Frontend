// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Header = ( { id }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleUpdateProfile = () =>{
    navigate('/editProfile',{state: { id } });
  };

  const handleAddOrganisation = () =>{
    navigate('/addOrg',{state: { id } });
  }

  return (
    <header className="header-container">
      <div className="logo">Welcome {id}</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="editProfile-button" onClick={handleUpdateProfile}>
        Edit Profile
      </button>
      <button className="editProfile-button" onClick={handleAddOrganisation}>
        Add Organisation
      </button>
    </header>
  );
};

export default Header;
