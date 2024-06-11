import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function Menu2() {
  function logot() {
    sessionStorage.clear();
  }

  const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
  const avatarSource = userInfo ? `http://localhost:3001/Uploads/ProfilesImages/${userInfo.nom}${userInfo.prenom}${userInfo.id}.jpg` : '';

  return (
    <nav className="navbar navbar-expand-md fixed-top" id="navbar">
      <div className="container-fluid px-0">
        <a href="/"><img className="navbar-brand w-75 d-md-none" src="/assets/img/logos/logo.svg" alt="logo" /></a>
        <a className="navbar-brand fw-bold d-none d-md-block" href="/">DXC Technology</a>
        <div className="collapse navbar-collapse justify-content-md-end" id="navbar-content" data-navbar-collapse="data-navbar-collapse">
          <Link to="/profile">
            <Avatar alt="User Avatar" src={avatarSource} style={{ border: "white solid 1px" }} />
          </Link>
          <Link to="/login">
            <Button className="btn btn-warning" style={{ color: 'white' }} onClick={logot}>Logout</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Menu2;
