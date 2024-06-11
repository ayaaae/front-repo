import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; // Import Avatar from Material-UI
import  Button  from '@mui/material/Button';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Notificationitem from '../../service-tache/pages/Manager/Notificationitem';
import { useEffect } from 'react';


function Absenceotification({r,rd}) {
  function off() {
    var x = document.getElementById("abssencenotif");
    x.style.visibility = "hidden";
  }
  const [Absencesnotif, setAbsencesnotif] = useState([]);
  useEffect(() => {

   

    fetchDataFromApi()
      .then((data) => {
        setAbsencesnotif(data);
      })
      .catch((error) => {
        console.error("Error fetching Demandes data:", error);
      });

   
    
      
  }, [r]);
  
      
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-ABCENSE/notifications/AllNotifications",
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("cant get data");
      throw new Error("Failed to fetch data from API");
    }
  };


  return (
    <div
      id="abssencenotif"
      className="  overlay3"
      style={{
        border: "#757272 solid 1px",
        borderRadius:"8px",
        padding: "0px",
        visibility: "hidden",
        "max-height":"420px",
        overflow:"auto",
        "float": "right",
      }}
    >



     
              
    </div>
  );

}

export default Absenceotification