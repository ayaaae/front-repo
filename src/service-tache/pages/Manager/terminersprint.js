import React, { useState } from "react";
import Backlog from "./Backlog";
import "./Manager.css";
import { GiRibbonMedal } from "react-icons/gi";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Cancel } from "@mui/icons-material";

function Terminersprint({nom,number,formsprintData,idprojet,id,rd,r}) {
  function off() {
    var x = document.getElementById("terminerSprint"+id);
    if(x){    x.style.visibility = "hidden";
  }
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
    
    const formsprinendtData={ ...formsprintData, etatsprint: "FAIT",idProjet:idprojet };
    console.log(formsprinendtData);
    
    
        try {
          const response = fetch(
            "http://localhost:8083/SERVICE-TACHE/sprint/update/" +formsprintData.id_sprint,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formsprinendtData),
            }
          );
          console.log("Response:", response);
        } catch (error) {
          console.error("Error:", error);
          alert("cant update " + id);
        }
    rd(r+1);
      }
    
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
      id={"terminerSprint"+id}
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
<span style={{margin:"10px",fontSize:"18px"}}>{"This sprint have "+number+" tickets donne"}</span><br/><br/>
<span style={{margin:"10px",fontSize:"18px"}}>All added successfuly !</span><br/><br/>    
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

export default Terminersprint;
