import React from 'react';

function NavBar({ pmData }) {
  const toggleFullScreen = () => {
    // Define the toggleFullScreen function here
  };

  return (
    <nav className="navbar header-navbar pcoded-header">
      <div className="navbar-wrapper">
        <div className="navbar-logo bg-light">
          <a href="/">
            <img className="img-fluid" src="/static/assets/images/last.png" alt="Theme-Logo" />
          </a>
        </div>

        <div className="navbar-container container-fluid">
          <ul className="nav-left">
            <li>
              <div className="sidebar_toggle"><a href="javascript:void(0)"><i className="ti-menu"></i></a></div>
            </li>

            <li>
              <a href="#!" onClick={toggleFullScreen}>
                <i className="ti-fullscreen"></i>
              </a>
            </li>
          </ul>

          <ul className="nav-right">
            <li className="user-profile header-notification">
              <a href="#!">
                <span>{pmData}</span>
                <i className="ti-angle-down"></i>
              </a>
              <ul className="show-notification profile-notification">
                <li>
                  <a href="/pm-profile">
                    <i className="ti-user"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="/deconn-pm">
                    <i className="ti-layout-sidebar-left"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
