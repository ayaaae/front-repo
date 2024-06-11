import React, { useState,useEffect  } from "react";
import Backlog from "./Backlog";
import "./Manager.css";
import { GiRibbonMedal } from "react-icons/gi";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Cancel } from "@mui/icons-material";

function Terminersprintfull({nom,number,formsprintData,idprojet,id,ended,opn,idp,rd,r}) {






  var today = new Date();

  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0'); 
  var day = String(today.getDate()).padStart(2, '0');
  var hours = String(today.getHours()).padStart(2, '0');
  var minutes = String(today.getMinutes()).padStart(2, '0');
  var seconds = String(today.getSeconds()).padStart(2, '0');
  
  var formattedDate= year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  const [max,setmax]=useState(0);

 

  //add sprint to move data to
  const [formData, setformData] = useState({
    id_sprint:id,
    etatsprint: "AFAIRE",
    projet: null,
    idProjet: idp,
    nom_sprint: "",
    description:"",
    datefin:"",
    datedebut:formattedDate,

  });


  

  const handlesprintInputChange = (event) => {

    const { name, value } = event.target;
      setformData({ ...formData, nom_sprint: value,idProjet:idp });  
  };
 
  function off() {
    var x = document.getElementById("terminerSprintfull"+id);
    if(x){x.style.visibility = "hidden";}
    
  }

  function HideShow(divtohide) {
    var x = document.getElementById(divtohide.name);
    
    if(x){
      if (x.style.visibility == "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
        x.style.visibility = "visible";
      }
    }
    
   
  }

 

  function handelendsprint(event){
    event.preventDefault();
  
        try {
          const response = fetch(
            "http://localhost:8083/SERVICE-TACHE/sprint/endSprint",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          console.log("Response:", response);
        } catch (error) {
          console.error("Error:", error);
          
        }
    window.location.reload();
      }

//selected sprint to send backlogs to
     
  function SecondaryBar() {
    return (
      <Box
        sx={{
          height: 30,

          padding: "0 16px",
          "border-top-left-radius": "20px",
          "border-top-right-radius": "20px ",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => {
            off();
          }}
          sx={{
            right: 8,
            top: 8,
            color: "rgb(95, 36, 159)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }



  
  return (


    <div
      id={"terminerSprintfull"+id}
      className=" overlay"
      style={{
        border: "rgba(0, 105, 117, 0.87) solid 1px",
        padding: "0px",
        visibility: "hidden",
      }}
    >
      <div className=" InnerHidden " 
      style={{width:"600px"}}>
        <SecondaryBar />
        <br></br>
        <div style={{ "text-align": "center" }}>
          <GiRibbonMedal size={125} color="rgb(51, 0, 114)" />
        </div>

<b style={{margin:"10px",fontSize:"20px"}}>{"End of Table "+nom}</b><br/><br/>
<span style={{margin:"10px",fontSize:"18px"}}>{"This sprint Contain: "}</span><br/><br/>
<span style={{margin:"10px",fontSize:"18px"}}><b>-</b>{ended.length+" Tickets Donne"}</span><br/><br/>
<span style={{margin:"10px",fontSize:"18px"}}><b>-</b>{opn.length+" Tickets Open"}</span><br/><br/>

<b style={{margin:"10px",fontSize:"15px"}}>Mouve the open tickets to :</b><br/><br/> 
<div className="form-group" style={{ marginLeft: "40px", marginRight: "40px",backgroundColor: "white",
              
              padding: "1px",
             
              }}>
            <input

style={{
              
  height:"40px",
  backgroundColor: "white",
  
  "border-radius": "10px",
  
  width: "100%",
}}

              
              label="State"
              name="nom_sprint"
              value={formData.nom_sprint}
              onChange={handlesprintInputChange}
              placeholder="leave the input empty to moveback the items to the backlog"
            />
          </div>

<div>
<button
                className="btn "
                style={{
                  margin:"10px",
                  color: "white",
                  backgroundColor: "rgb(51, 0, 114)",
                  float: "right",

                  "margin-right": "5px",
                }}
                onClick={(event) => {
                  handelendsprint(event);
                }}
              >
                End Sprint
              </button>
              <button
                className="btn "
                style={{
                  margin:"10px",
                  border:"solid 1px rgb(51, 0, 114)",
                  backgroundColor: "white",
                  float: "right",
color:"black",
                  "margin-right": "5px",
                }}
                onClick={(event) => {
                 off();
                }}
              >
                Cancel
              </button>
  


  </div>    
      </div>
      <br></br> <br></br>

    </div>
  );
}

export default Terminersprintfull;
