import React from "react";
import Backlog from "./Backlog";
import "./Manager.css";
import { FaPersonRunning } from "react-icons/fa6";
import { AiOutlinePicCenter } from "react-icons/ai";
import { useState,useEffect } from "react";
import {IconButton ,Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

function AddEpic({idp,rd,r}) {
  function off() {
    var x = document.getElementById("AddEpic");
    x.style.visibility = "hidden";
  }

  //use states
  const [formEpicData, setformEpicData] = useState({
    id_epic: "",
    idProjet: idp,
    nom_epic: "",
    couleur:"",
    description: "",
    userStories: []
  });


  //handel file change
  const handleEpicInputChange = (event) => {

    const { name, value } = event.target;
    setformEpicData({ ...formEpicData, [name]: value, idProjet: idp });
    

  };


 

  // Handle form submission
  const handleEpicSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/epic/createEpic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formEpicData),
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
setformEpicData({...formEpicData,nom_epic:"",id_epic:"",nom:"",couleur:"",description:""})
    rd(r+1);
  };

  function SecondaryBar() {
    return (
      <Box
        sx={{
          height: 40,
         
              padding: '0 16px',
              "border-top-left-radius": "20px",
              "border-top-right-radius": "20px "
        }}
      >

        <IconButton
          aria-label="close"
          onClick={() => { off(); }}
          sx={{
            
            right: 8,
          
            color: 'rgb(95, 36, 159)'
          }}
        >
          <CloseIcon />
        </IconButton>

       

      
        
        </Box>
    );
  }

  return (
    <div
      id="AddEpic"
      className="  overlay"
      style={{
        border: "rgba(95, 36, 159, 0.87) solid 1px",
        padding: "0px",
        visibility: "hidden",
      }}
    >
      <div
        className=" InnerHidden "
      >
       <SecondaryBar />
        <div
          style={{ "text-align": "center", color: "rgba(95, 36, 159, 0.87)" }}
        >
          <AiOutlinePicCenter size={"80px"} />
        </div>

        <form method="post" onSubmit={handleEpicSubmit}>
         
          <div className="form-group" style={{ marginLeft: "40px" ,marginRight: "40px"}}>
          <TextField id="nom_epic" label="Epic Name" variant="standard"
          name="nom_epic"
          value={formEpicData.nom_epic}
          onChange={handleEpicInputChange}   required
          sx={{width:'100%', marginTop: '10px'}}/>
            
          </div>

          <div className="form-group"  style={{ marginLeft: "40px" ,marginRight: "40px"}}>
          <TextField
          id="description"
          label="Description"
          name="description"
          value={formEpicData.description}
          onChange={handleEpicInputChange}
          required
          multiline
          maxRows={4}
          variant="standard"
          sx={{width:'100%',marginTop: '10px'}}
        />
          </div>

       <div className="form-group"  style={{ marginLeft: "40px" ,marginRight: "40px"}}>
          
          <TextField
      label="Pick your Color"
      type="color"
      name="couleur" id="couleur" 
      variant="standard"
      value={formEpicData.couleur} onChange={handleEpicInputChange}
      sx={{width:'20%',marginTop: '10px'}}
      InputProps={{
        style: {
          marginTop: 16, // Marge optionnelle
        },
      }}
    />
      </div>

          <div style={{ "text-align": "center", "margin-bottum": "10px",margin: '10px' }}>
            <button
              type="submit"
              class="btn"
              style={{
                color: "white",
                backgroundColor: 'rgb(51,0,114)',
                margin: "1px",
                "border-radius": "5px",
              }}
              
            >
              Add
            </button>
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
}

export default AddEpic;
