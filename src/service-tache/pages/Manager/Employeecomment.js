import React, { useState } from "react";
import { IoMdPaper } from "react-icons/io";
import "./Manager.css";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { FaComments } from "react-icons/fa";

import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  OutlinedInput,
  Grid,
} from "@mui/material";
import TacheCard from "./TacheCard";
import Commentcard from "./Commentcard";
import { Sync } from "@mui/icons-material";

function Employeecomment({ comments, idtache, bkl,ide }) {
  function off() {
    var x = document.getElementById("Employeecomment" + idtache);
    x.style.visibility = "hidden";
  }



  const [formcommnetdata, setformcommnetdata] = useState({
    id:"0",
    texte:"",
    idemploye:ide,
   backlog:{id_backlog:bkl.id_backlog}
  });





  const handlebacklogInputChange = (event) => {
    const { name, value } = event.target;
  if(name=="texte"){
    setformcommnetdata({...formcommnetdata,texte:value})
  }
    
  };

  

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

  const AddComment= (event)=>{
event.preventDefault();


try {
  const response =  fetch(
    "http://localhost:8083/SERVICE-TACHE/commentaire/createCommentaire",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formcommnetdata),
    }
  );
  
  console.log(formcommnetdata);
  console.log("Response:", response);
} catch (error) {
  console.error("Error:", error);
}



window.location.reload();

  }
  return (
    <div
      id={"Employeecomment" + idtache}
      className="overlay2"
      style={{ visibility: "hidden" }}
    >
    
      {/*here we go */}

      <div className="InnerHidden2">
        <SecondaryBar />

        <div className="icon-container">
          <FaComments size={"80px"} />
        </div>
        <div className="scrollable-content">
          <form method="post" >
            <br />
            <br />
            <div>
              <b style={{ marginLeft: "6%" }}>Add comment :</b>
            </div>
            <div
              className="form-group"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
              <textarea
                id="standard-basic"
                label="Task Name"
                variant="standard"
                name="texte"
                value={formcommnetdata.texte}
                onChange={handlebacklogInputChange}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>
            <br></br>

            <div
              style={{
                "text-align": "center",
                "margin-bottum": "10px",
                marginRight: "6%",
              }}
            >
              <button
              onClick={AddComment}
                class="btn"
                style={{
                  float: "right",
                  color: "white",
                  backgroundColor: "rgb(51,0,114)",
                  margin: "1px",
                  "border-radius": "5px",
                }}
              >
                Add
              </button>
              
            </div>
          </form>
          <br></br>
          <br></br>
          <br></br>
          <div>
            {comments.map((item) => (
              <Commentcard comment={item} bkl={bkl}/>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Employeecomment;
