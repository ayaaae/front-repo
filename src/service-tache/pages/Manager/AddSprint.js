import React, { useState } from "react";
import Backlog from "./Backlog";
import "./Manager.css";
import { FaPersonRunning } from "react-icons/fa6";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

function AddSprint({idp,rd,r}) {
  function off() {
    var x = document.getElementById("AddSprint");
    x.style.visibility = "hidden";
  }

  var today = new Date();

  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  var hours = String(today.getHours()).padStart(2, "0");
  var minutes = String(today.getMinutes()).padStart(2, "0");
  var seconds = String(today.getSeconds()).padStart(2, "0");

  var formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

  const [formsprintData, setformsprintData] = useState({
    id_sprint: "",
    etatsprint: "AFAIRE",
    idProjet: idp,
    nom_sprint: "",
    description: "",
    datefin: "",
    datedebut: formattedDate,
    period: "1",
  });

  const handlesprintInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue;
  
    if (name === "datedebut") {
      // If the start date is changed, update the end date based on the selected period
      if (formsprintData.period === "1") {
        var newDate = new Date(value);
        newDate.setDate(newDate.getDate() + 7);
        updatedValue = newDate.toISOString().slice(0, -8);
      } else if (formsprintData.period === "2") {
        var newDate = new Date(value);
        newDate.setDate(newDate.getDate() + 14);
        updatedValue = newDate.toISOString().slice(0, -8);
      }
  
      // Create a new variable with the updated value
      setformsprintData({ ...formsprintData, [name]: updatedValue, idProjet: idp });
      setformsprintData({ ...formsprintData, datefin: updatedValue }); // update the end date with the new value
    } else {
      setformsprintData({ ...formsprintData, [name]: value, idProjet: idp });
    }
    if (name === "datedebut") {
      // If the start date is changed, update the end date based on the selected period
      if (formsprintData.period === "1") {
        var newDate = new Date(value);
        newDate.setDate(newDate.getDate() + 7);
        updatedValue = newDate.toISOString().slice(0, -8);
      } else if (formsprintData.period === "2") {
        var newDate = new Date(value);
        newDate.setDate(newDate.getDate() + 14);
        updatedValue = newDate.toISOString().slice(0, -8);
      }
  
      // Create a new variable with the updated value
      setformsprintData({ ...formsprintData, [name]: updatedValue, idProjet: idp });
      setformsprintData({ ...formsprintData, datefin: updatedValue }); // update the end date with the new value
    } else {
      setformsprintData({ ...formsprintData, [name]: value, idProjet: idp });
    }
  };

  const handlesprintSubmit = async (event) => {
    event.preventDefault();
    if (formsprintData.datedebut && formsprintData.datefin) {
      var datedebut = new Date(formsprintData.datedebut);
      var datefin = new Date(formsprintData.datefin);
    if(datedebut.getTime() < datefin.getTime()){
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/sprint/createSprint" ,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formsprintData),
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
     
    }
  
    
  console.log("sprint tot send  :");
  console.log(formsprintData);
  
  
  
  setformsprintData({...formsprintData,nom_sprint:"",description:"",datefin:"",id_sprint:""});
  
   rd(r+1);;
  }else{

    alert("date debut ne doit pas depassed date de fin");
    }
    
  }
    
    
  };

  function SecondaryBar() {
    return (
      <Box
        sx={{
          height: 30,
          padding: "0 16px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
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
            color: "rgb(95, 36,159)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <div
      id="AddSprint"
      className=" overlay"
      style={{
        border: "rgba(0, 105, 117, 0.87) solid 1px",
        padding: "0px",
        visibility: "hidden",
      }}
    >
      <div className=" InnerHidden ">
        <SecondaryBar />

        <div
          style={{
            "text-align": "center",
            color: "rgba(95, 36, 159, 0.87)",
          }}
        >
          <FaPersonRunning size={"70px"} />
        </div>

        <form method="post" onSubmit={handlesprintSubmit}>
          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <TextField
              name="nom_sprint"
              value={formsprintData.nom_sprint}
              onChange={handlesprintInputChange}
              id="standard-basic"
              label="Sprint Name"
              variant="standard"
              sx={{ width: "100%", marginTop: "10px" }}
            />
          </div>

          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <TextField
              id="standard-multiline-flexible"
              name="description"
              value={formsprintData.description}
              onChange={handlesprintInputChange}
              label="Description"
              multiline
              maxRows={4}
              variant="standard"
              sx={{ width: "100%", marginTop: "10px" }}
            />
          </div>

          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <select
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "100%",
              }}
              select
              label="State"
              name="etat_sprint"
              value={formsprintData.etat}
              onChange={handlesprintInputChange}
            >
              <option value="AFAIRE">A FAIRE</option>
              <option value="ENCOURS">EN COURS</option>
              <option value="FAIT">FAIT</option>
            </select>
          </div>

          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <label htmlFor="period">Period:</label>
            <select
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "100%",
              }}
              id="period"
              label="Period"
              name="period"
              value={formsprintData.period}
              onChange={handlesprintInputChange}
            >
              
              <option value="1">1 week</option>
              <option value="2">2 weeks</option>
            </select>
          </div>


          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <TextField
              label="Starting date"
              type="datetime-local"
              variant="standard"
              sx={{ width: "100%", marginTop: "10px" }}
              InputLabelProps={{
                shrink: true,
              }}
              name="datedebut"
              value={formsprintData.datedebut}
              onChange={handlesprintInputChange}
            />
          </div>

          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px" }}>
            <TextField
              label="Due date"
              type="datetime-local"
              variant="standard"
              sx={{ width: "100%", marginTop: "10px" }}
              InputLabelProps={{shrink: true,
              }}
              name="datefin"
              value={formsprintData.datefin}
              onChange={handlesprintInputChange}
            />
          </div>

          <div style={{ "text-align": "center", "margin-bottum": "10px", margin: "10px" }}>
            <button
              type="submit"
              class="btn"
              style={{
                color: "white",
                backgroundColor: "rgb(51,0,114)",
                margin: "1px",
                borderRadius: "5px",
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSprint;