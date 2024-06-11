import React, { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkIcon from '@mui/icons-material/Work';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DnsIcon from '@mui/icons-material/Dns';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { Typography } from '@material-ui/core';
import { colors } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import { useParams } from 'react-router-dom';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
export default function SidebarEmp({ openSidebar }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [isOpenSideBar, setisOpenSideBar] = React.useState(openSidebar);

  React.useEffect(() => {
    setisOpenSideBar(openSidebar);
  }, [openSidebar]);

  const handleClickSideBar = () => {
    setisOpenSideBar(!openSidebar);
  };
  const userInfoData = sessionStorage.getItem("UserInfo");
const userInfoObject = userInfoData ? JSON.parse(userInfoData) : {};


  const idsUserConnecte = userInfoObject.id;
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nom: "",
    mot_de_passe: "",
    prenom: "",
    role: "",
    token:{
      id:"",
      token:"",
    },
    projetids:""
  });
  const handleNavigation = (event, path) => {
    if (!projectid) {
      event.preventDefault(); }
       else {
      window.location.href = path;
    }
  };
  
  let userRole = '';
  
  if (userInfoData) {
    try {
      const parsedUserInfo = JSON.parse(userInfoData);
      userRole = parsedUserInfo.role;
    } catch (error) {
      console.error("Error parsing user info data:", error);
    }
  }
 
  const { projectid } = useParams();
  return (
    <List
      sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper',marginLeft:"1px", marginTop:"5px",
      display: isOpenSideBar ? 'block' : 'none', 
      }}
      
    
    >
      
     

      <ListItemButton component={Link} to="/DashboardM" >
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* <ListItemButton component={Link} to="/Gantt-chart">
        <ListItemIcon>
          <ViewTimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Timeline" />
      </ListItemButton> */}
      {projectid !== undefined ? (
        <>
          {userRole !== "chef_projet" ? (
            <ListItemButton component={Link} to={`/Employee-Backlog/${projectid}`}>
              <ListItemIcon>
                <DnsIcon />
              </ListItemIcon>
              <ListItemText primary="Backlog" />
            </ListItemButton>
          ) : (
            <>
            <ListItemButton component={Link} to={`/tache/${projectid}`}>
              <ListItemIcon>
                <DnsIcon />
              </ListItemIcon>
              <ListItemText primary="Backlog" />
            </ListItemButton>

            <ListItemButton component={Link} to={`/Project-Employees-List/${projectid}`}>
            <ListItemIcon>
            <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Project Members" />
            </ListItemButton>

            </>
          )}

          <ListItemButton component={Link} to={`/Employee-Board/${projectid}`}>
            <ListItemIcon>
              <ViewWeekIcon />
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItemButton>

          <ListItemButton component={Link} to={`/Employee-TasksPage/${projectid}`}>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>

        
        </>
      ) : (
        <>
          <ListItemButton onClick={(event) => handleNavigation(event, '/current-path')}>
            <ListItemIcon>
              <DnsIcon />
            </ListItemIcon>
            <ListItemText primary="Backlog" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handleNavigation(event, '/current-path')}>
            <ListItemIcon>
            <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Project Members" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handleNavigation(event, '/current-path')}>
            <ListItemIcon>
              <ViewWeekIcon />
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItemButton>

          <ListItemButton onClick={(event) => handleNavigation(event, '/current-path')}>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
          <ListItemButton component={Link} to={`/Gantt-Charttt`}>
            <ListItemIcon>
              <LeaderboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Gantt" />
          </ListItemButton>
          
        </>
      )}
    
    {userRole !== "chef_projet" ? (
            <ListItemButton component={Link} to={`/Demande-Absence`}>
              <ListItemIcon>
                <EditCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Absence" />
            </ListItemButton>
          ) : (
            <ListItemButton component={Link} to={`/Maneger-absence`}>
              <ListItemIcon>
                <EditCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Absence" />
            </ListItemButton>
          )}

      {/* <ListItemButton >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItemButton> */}

      {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Something" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} 
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="xxxxxxx" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}