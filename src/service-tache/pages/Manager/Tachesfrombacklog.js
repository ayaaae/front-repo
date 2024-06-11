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

function Tachesfrombacklog({ comments, idtache, bkl, empls,ide,taches,rd,r,c }) {
  function off() {
    var x = document.getElementById("Tachesfrombacklog" + idtache);
    x.style.visibility = "hidden";
  }
  function work(i){
    let s1=0;
    let s2=0;
    c.map((b)=>{
      b.taches.map((t)=>{
        if(t.idemployee==i){
          s1++;
        }
      })
    
    s2=s2+b.taches.length;
    });return s1+" tasks from "+s2;}
  const [formtachedata, setformtachedata] = useState({
    id_tache: "",
    idemployee: "0",
    duree: "",
    etat_tache: "AFAIRE",
    nom_tache: "",
    description_tache: "",
    backlog: { id_backlog: bkl.id_backlog },
  });


  const [formcommnetdata, setformcommnetdata] = useState({
    id:"0",
    texte:"",
    idemploye:ide,
    date:null,
   backlog:{id_backlog:bkl.id_backlog}
  });





  const handlebacklogInputChange = (event) => {
    const { name, value } = event.target;
  if(name=="texte"){
    setformcommnetdata({...formcommnetdata,texte:value})
  }
    if (name == "etat_tache") {
      setformtachedata({ ...formtachedata, etat_tache: value });
    }

    setformtachedata({ ...formtachedata, [name]: value });
  };

  // Handle form submission
  const handleEpicSubmit = async (event) => {
    event.preventDefault();
    console.log("this is tache to send");
    console.log(formtachedata);
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/Taches/createTache",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formtachedata),
        }
      );
      console.log("formtachedata");
      console.log(formtachedata);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
setformtachedata({...formcommnetdata,nom_tache:"",description_tache:"",duree:"",id_tache:""});
    rd(r+1);
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



rd(r+1);

  }
  return (
    <div
      id={"Tachesfrombacklog" + idtache}
      className="overlay2"
      style={{ visibility: "hidden" }}
    >
      <div className="InnerHidden">
        <SecondaryBar />

        <div className="icon-container">
          <IoMdPaper size={"80px"} />
        </div>
        <div className="scrollable-content">
          <form method="post" onSubmit={handleEpicSubmit}>
            <div
              className="form-group"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
              <TextField
                id="standard-basic"
                label="Task Name"
                variant="standard"
                name="nom_tache"
                value={formtachedata.nom_tache}
                onChange={handlebacklogInputChange}
                sx={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <div
              className="form-group"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
              <TextField
                id="standard-multiline-flexible"
                label="Task description"
                multiline
                maxRows={4}
                name="description_tache"
                value={formtachedata.description_tache}
                onChange={handlebacklogInputChange}
                variant="standard"
                sx={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <div
              className="form-group"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
              <TextField
                type="number"
                id="standard-multiline-flexible"
                label="Task duration"
                multiline
                maxRows={4}
                placeholder="Duration in Hours"
                name="duree"
                value={formtachedata.duree}
                onChange={handlebacklogInputChange}
                variant="standard"
                sx={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <br></br>
            <br></br>
            <div
              className="form-group"
              style={{
                marginLeft: "40px",
                marginRight: "40px",
                backgroundColor: "white",

                padding: "1px",
              }}
            >
              <label style={{ fontSize: "17px" }}>Etat</label>
              <select
                style={{
                  backgroundColor: "white",

                  "border-radius": "10px",

                  width: "100%",
                }}
                select
                name="etat_tache"
                value={formtachedata.etat_tache}
                onChange={handlebacklogInputChange}
              >
                <option
                  value="AFAIRE"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  {" "}
                  AFAIRE
                </option>
                <option
                  value="ENCOURS"
                  style={{ backgroundColor: "orange", color: "white" }}
                >
                  EN COURS
                </option>
                <option
                  value="FAIT"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  FAIT
                </option>
              </select>
            </div>

            <br></br>
            <br></br>
            <div
              className="form-group"
              style={{
                marginLeft: "40px",
                marginRight: "40px",
                backgroundColor: "white",

                padding: "1px",
              }}
            >
              <label style={{ fontSize: "17px" }}>Employee</label>
              <select
                style={{
                  backgroundColor: "white",

                  "border-radius": "10px",

                  width: "100%",
                }}
                name="idemployee"
                value={formtachedata.idemployee}
                onChange={handlebacklogInputChange}
              >
                <option value={0}>{}</option>

                {empls.map((item) => {
                  if (item.role != "chef_projet") {
                    return (
                      <option key={item.id} value={item.id} title={work(item.id)}>
                        {item.nom + " " + item.prenom+"->"+item.role}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div
              style={{
                "text-align": "center",
                "margin-bottum": "10px",
                margin: "10px",
              }}
            >
              <button
                type="submit"
                class="btn"
                style={{
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
          {taches.map((item) => (
            <TacheCard
            c={c}
            rd={rd}
            r={r}
            emps={empls}
              id={item.id_tache}
              state={item.etat_tache}
              nom={item.nom_tache}
              des={item.description_tache}
              bl={bkl}
              idemployee={item.idemployee}
              duree={item.duree}
            />
          ))}
        </div>
        <br></br>
        <br></br>
      </div>

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
          { <div>
            {comments.map((item) => (
              <Commentcard comment={item} bkl={bkl} rd={rd} r={r}/>
            ))}
          </div> }
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Tachesfrombacklog;
