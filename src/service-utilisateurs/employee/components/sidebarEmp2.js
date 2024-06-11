import * as React from 'react';
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

      {/* <ListItemButton component={Link} to="/tache">
        <ListItemIcon>
          <DnsIcon />
        </ListItemIcon>
        <ListItemText primary="Backlog" />
      </ListItemButton> */}

      <ListItemButton  component={Link} to="/Employee-Board/idprojet">
        <ListItemIcon>
          <ViewWeekIcon />
        </ListItemIcon>
        <ListItemText primary="Board" />
      </ListItemButton>

      <ListItemButton  component={Link} to="/Employee-TasksPage/idprojet">
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItemButton>

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
