import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, IconButton, Box, Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


function Menu3navbar() {
    function logot(){
        sessionStorage.clear();
      }
      
      const [sidebarOpen, setSidebarOpen] = useState(true);

const toggleSidebar = () => {
    console.log("sidebarOpen avant le changement :", sidebarOpen);
    setSidebarOpen(!sidebarOpen);
    console.log("sidebarOpen après le changement :", !sidebarOpen);
  };
    
      return (
        <>
        <Box display="flex" >
        <nav className="navbar navbar-expand-md fixed-top" id="navbar" >
          
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon sx={{color:'#fff'}}/>
          </IconButton>
            
            <div className="container-fluid px-0"><a href="/"><img className="navbar-brand w-75 d-md-none" src="/assets/img/logos/logo.svg" alt="logo" /></a><a className="navbar-brand fw-bold d-none d-md-block" href="/">DXC Technology</a>
          
            <div className="collapse navbar-collapse justify-content-md-end" id="navbar-content" data-navbar-collapse="data-navbar-collapse">
                  
    
            </div>
            <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Badge color="#ff0000" badgeContent={99} sx={{ color: 'white', mr: 2 }}>
              <NotificationsNoneIcon sx={{ color: 'white' }} />
            </Badge>
          </IconButton>
            
           
        
        
        
        
      
            <Link to="/profile">
                                                      <img  className="rounded-circle " width="50px" height="50px" src={'http://localhost:3001/Uploads/ProfilesImages/'+JSON.parse(sessionStorage.getItem("UserInfo")).nom+JSON.parse(sessionStorage.getItem("UserInfo")).prenom+JSON.parse(sessionStorage.getItem("UserInfo")).id+".jpg"} style={{"border":"white solid 1px" }}   />       </Link>
           <Link to="/login">
            



            <Button className="btn btn-warning"  style={{color:'white' }} onClick={()=>{logot()}}>Logout</Button>
            </Link>
     
            </div>
        </nav>
        
        </Box>
        </>
      );
}

export default Menu3navbar