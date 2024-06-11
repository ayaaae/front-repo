import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; // Import Avatar from Material-UI
import  Button  from '@mui/material/Button';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";



function Notificationitem({notif,rd,r}) {
    const navigate = useNavigate();

  let element=<></>;
/*
  const [formnotifData, setformnotifData] = useState({
    id: notif.id,
    status: notif.status ,
    date: notif.date,
    message: notif.message ,
    openat:notif.openat,
   readat: notif.readat ,
   employee_id:notif.employee_id,
   task_id:notif.task_id,
  });
*/

if(notif.readat === null){
  element=<FaCircle />;

}


if(notif.readat !=null){
  element=<></>;

}

const handleIconClick = (event) => {
  event.stopPropagation();

  const formnotifData = { ...notif, readat: new Date() };
    
  try {
    const response =  fetch(
      "http://localhost:8083/SERVICE-ABCENSE/notifications/update/" + formnotifData.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formnotifData),
      }
    );

    
    const data =  response.json();
  } catch (error) {
    console.log(JSON.stringify(formnotifData));
    console.error("Error updating notification:", error);
  }
  
  rd(r+1);
  

  navigate("/Maneger-absence");

};


const handlereadClick = (event) => {
  event.stopPropagation();

  const formnotifData = { ...notif, readat: new Date() };
    
  try {
    const response =  fetch(
      "http://localhost:8083/SERVICE-ABCENSE/notifications/update/" + formnotifData.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formnotifData),
      }
    );

    
    const data =  response.json();
  } catch (error) {
    console.log(JSON.stringify(formnotifData));
    console.error("Error updating notification:", error);
  }
  
  rd(r+1);
  

  

};
  return (
   
    
      <div
      onClick={handleIconClick}

      
        className="InnerHidden4 "
        style={{"float": "right",margin:"5px"}}
      >
        <div
          style={{ "text-align": "center", color: "#757272",padding:"10px" }}
        >
            <span  style={{"font-size":"15px",float:"left",marginLeft:"5px",backgroundColor:"#4528A7",color:"white",padding:"2px",borderRadius:"8px"}}>{notif.date.split('T').slice(0, 1).join(' ')}</span>  <span  style={{"font-size":"25px",float:"right",marginLeft:"5px",color:"#0255AE"}}         
title='marked  unread' onClick={handlereadClick}>
        {element}
      </span>
<br></br>
<br/>
  <span style={{"font-size":"15px",float:"left",marginLeft:"5px"}}><b>{notif.message.split(' ').slice(0, 2).join(' ')}</b></span> 

  <br></br>
  <span style={{"font-size":"15px",float:"left",marginLeft:"5px",color:"black"}}>{notif.message}</span>
<br></br>
        </div>

        <br></br>
      
          
          

      </div>
  );

}

export default Notificationitem