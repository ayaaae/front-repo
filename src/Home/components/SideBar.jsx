import React, { useState } from 'react';
import SidebarEmp from '../../service-utilisateurs/employee/components/sidebarEmp';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logot = () => {
    // Define your logout logic here
    console.log('Logout clicked');
  };

  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top" id="navbar">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon sx={{ color: '#fff' }} />
        </IconButton>

        <div className="container-fluid px-0">
          <a href="/">
            <img className="navbar-brand w-75 d-md-none" src="/assets/img/logos/logo.svg" alt="logo" />
          </a>
          <a className="navbar-brand fw-bold d-none d-md-block" href="/">
            DXC Technology
          </a>

          <div className="collapse navbar-collapse justify-content-md-end" id="navbar-content" data-navbar-collapse="data-navbar-collapse"></div>

          <Link to="/profile">
            <img
              className="rounded-circle "
              width="50px"
              height="50px"
              src={
                'http://localhost:3001/Uploads/ProfilesImages/' +
                JSON.parse(sessionStorage.getItem('UserInfo')).nom +
                JSON.parse(sessionStorage.getItem('UserInfo')).prenom +
                JSON.parse(sessionStorage.getItem('UserInfo')).id +
                '.jpg'
              }
              style={{ border: 'white solid 1px' }}
              alt="profile"
            />
          </Link>
          <Link to="/login">
            <Button className="btn btn-warning" style={{ color: 'white' }} onClick={logot}>
              Logout
            </Button>
          </Link>
        </div>
      </nav>
      <SidebarEmp openSidebar={sidebarOpen} />
    </>
  );
}

export default SideBar;
