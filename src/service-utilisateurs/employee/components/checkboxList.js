import * as React   from 'react';
import  { useEffect, useState }from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import SvgIcon from '@mui/material/SvgIcon';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Employeecomment from '../../../service-tache/pages/Manager/Employeecomment';
import IconButton from '@mui/material/IconButton';

export default function CheckboxList({showCheckboxList, sprint, backlogs}) {

  function HideShow(divtohide) {

    var x = document.getElementById(divtohide.name);
    if(x){

      if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
      x.style.visibility = "visible";
    }
  }
    }
    

  //afficher la checkboxlist
  const [isShowCheckboxList, setisShowCheckboxList] = React.useState(showCheckboxList);
  const [employees, setEmployees] = useState([]);
  const [employeeIds, setEmployeeIds] = useState([]);

  // useEffect(() => {
  //   setisShowCheckboxList(showCheckboxList);
  // }, [showCheckboxList]);


  useEffect(() => {
    const newEmployeeIds = [...new Set(backlogs.map(backlog => backlog.id_employee))];
    if (newEmployeeIds.length !== employeeIds.length || !newEmployeeIds.every((id, index) => id === employeeIds[index])) {
      setEmployeeIds(newEmployeeIds);
    }
  }, [backlogs, employeeIds]);

  useEffect(() => {
    if (employeeIds.length > 0) {
      Promise.all(employeeIds.map(id =>
        fetch(`http://localhost:8083/SERVICE-UTILISATEUR/public/GetEmployee/${id}`)
          .then(response => response.json())
      ))
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
    }
  }, [employeeIds]);

  const findEmployeeName = (id_employee) => {
    const employee = employees.find(emp => emp.id === id_employee);
    return employee ? `${employee.nom} ${employee.prenom}` : 'Unknown';
  };

  
  const getBgColor = (etat) => {
    switch (etat) {
      case "ENCOURS":
        return 'rgb(237, 155, 51)';
      case "FAIT":
        return 'rgb(108,194,074)';
      case "AFAIRE":
        return 'rgb(99,102,106)';
      default:
        return 'inherit';
    }
  };

  const getButtonText = (etat) => {
    switch (etat) {
      case "ENCOURS":
        return "In Progress";
      case "FAIT":
        return "Done";
      case "AFAIRE":
        return "To Do";
      default:
        return "";
    }
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }

  function stringAvatar(name) {
    const isNumber = (str) => !isNaN(str);
    if (isNumber(name)) {
      return { 
        sx: { 
          bgcolor: 'rgba(217, 217, 214)', 
          width: '15px', 
          height: '15px' 
        }, 
        children: (
          <span style={{ fontSize: '12px', fontWeight: 'bold',color:'black' }}>
            {name}
          </span>
        ), 
        title: 'Priority',
      };
    }
    const nameParts = name.split(' ');
   
    if (nameParts.length < 2) 
      return { sx: { bgcolor: stringToColor(name), width: '30px', height: '30px' }, children: name[0] };

    return {
      sx: {
        bgcolor: stringToColor(name),
        width: '30px',
        height: '30px'

      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      title:'Assignee: '+name,
     
    };
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', display: showCheckboxList ? 'block' : 'none' }}>
      {backlogs.map((backlog, index) => {


const userInfoData = sessionStorage.getItem("UserInfo");

const userInfoObject = JSON.parse(userInfoData);

const idUserConnecte = userInfoObject.id;


        const labelId = `checkbox-list-label-${backlog.id_backlog}`;
        const employeeName = findEmployeeName(backlog.id_employee);


        return (

        
          <ListItem key={backlog.id_backlog} disablePadding sx={{
            borderBottom: index < backlogs.length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
          }}>
            <span role={undefined} dense style={{ display: 'flex', alignItems: 'center', width: '100%', height: '50px' }}>
              <ListItemText id={labelId} primary={backlog.nom_backlog} />


              <Avatar {...stringAvatar(backlog.prioriter)} />

              <Button variant="contained" size="small" sx={{
                fontSize: '0.65rem', margin: '0 5px',
                bgcolor: backlog.epic ? backlog.epic.couleur : 'rgb(99,102,106)', '&:hover': {
                  bgcolor: backlog.epic ? backlog.epic.couleur : 'rgb(99,102,106)',
                },
              }}>
                {backlog.epic ? backlog.epic.nom_epic : 'No Epic'}
              </Button>

              <Button variant="contained" size="small" sx={{
                fontSize: '0.65rem', margin: '0 5px',
                bgcolor: getBgColor(backlog.etat),
                '&:hover': {
                  bgcolor: getBgColor(backlog.etat),
                },
            }}>
                {getButtonText(backlog.etat)}
                </Button>

            
                <Avatar {...stringAvatar(employeeName)} />


 {/*comments*/} 




 <Employeecomment comments={backlog.comments} ide={idUserConnecte} idtache={backlog.id_backlog} bkl={backlog}/>


 <IconButton
      style={{
        backgroundColor: "white",
        border: "1px white ",
        padding: "1px",
        float: "right",
      }}
      onClick={(event) => {
        event.preventDefault();
        HideShow({
          name: "Employeecomment" + backlog.id_backlog,
        });
      }}
    >
      <CommentOutlinedIcon />
    </IconButton>


            </span>
          </ListItem>
        );
      })}
    </List>
  );
}