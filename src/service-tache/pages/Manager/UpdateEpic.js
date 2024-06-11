import React from "react";
import Backlog from "./Backlog";
import "./Manager.css";
import { FaPersonRunning } from "react-icons/fa6";
import { AiOutlinePicCenter } from "react-icons/ai";
import { useState, useEffect } from "react";

function UpdateEpic({ id_epic, nom_epic, description, colore,idp,rd,r }) {
  function off() {
    var x = document.getElementById("UpdateEpic" + id_epic);
    x.style.visibility = "hidden";
  }

  const epicId = id_epic;
  const epicName = nom_epic;
  const descrption = description;
  //use states
  const [formEpicData, setformEpicData] = useState({
    id_epic: epicId || "",
    idProjet: idp,
    couleur: colore || "",
    nom_epic: epicName || "",
    description: descrption || "",
    userStories: [],
  });

  //handel file change
  const handleEpicInputChange = (event) => {
    const { name, value } = event.target;
    setformEpicData({ ...formEpicData, [name]: value, idProjet: idp });
  };

  const handeldelete = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/epic/delete/" + id_epic,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
      rd(r+1);;

    } catch (error) {
      console.error("Error:", error);
    }


  };





  // Handle form submission
  const handleEpicSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/epic/update/" + id_epic,
        {
          method: "PUT",
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

    







    rd(r+1);;
  };

  return (
    <div
      id={"UpdateEpic" + epicId}
      className="  overlay"
      style={{
        border: "rgba(95, 36, 159, 0.87) solid 1px",
        padding: "0px",
        visibility: "hidden",
      }}
      onClick={(event)=>{event.stopPropagation();}}
    >
      <div
        className="container InnerHidden "
        style={{ border: "rgba(95, 36, 159, 0.87) solid 1px" }}
      >
       
        <div
          style={{
            "text-align": "center",
            margin: "0px",
            fontSize: "25px",
            width: "100%",
            color: "rgba(95, 36, 159, 0.87)",
       
            padding: "10px",
          }}
        >

<span
          
          style={{
            paddingLeft:"5px",
            color: "rgba(95, 36, 159, 0.87)",
  
            
           
            width:"20px",
            "border-radius": "20px",
           
            float:"left"
          }}
          onClick={(event) => {event.stopPropagation();
            off();
          }}
        >
          X
        </span>
          
        </div>
        <br></br>
        <div
          style={{ "text-align": "center", color: "rgba(95, 36, 159, 0.87)" }}
        >
          <AiOutlinePicCenter size={"80px"} />
        </div>

        <form method="post" onSubmit={handleEpicSubmit}>
          <div class="form-group " style={{ margin: "2px" }}>
            <label for="inputEmail4">Epic Name</label>
            <input
              type="text"
              style={{ border: "rgba(95, 36, 159, 0.87) solid 1px" }}
              class="form-control"
              id="nom_epic"
              name="nom_epic"
              value={formEpicData.nom_epic}
              onChange={handleEpicInputChange}
              required
            />
          </div>
          <br></br>
          <div class="form-group " style={{ margin: "2px" }}>
            <label for="inputEmail4">Description</label>
            <textarea
              style={{ border: "rgba(95, 36, 159, 0.87) solid 1px" }}
              class="form-control"
              rows="3"
              id="description"
              name="description"
              value={formEpicData.description}
              onChange={handleEpicInputChange}
              required
            ></textarea>
          </div>
          <br></br>
          <div class="form-row" style={{ margin: "2px" }}>
            <label for="inputEmail4">Pick your Color</label>
            <br></br>
            <input
              style={{
                fontSize: "10px",
                "": "center",
                width: "20%",
                "border-radius": "10px",
                marginLeft: "5px",
              }}
              type="color"
              name="couleur"
              id="couleur"
              value={formEpicData.couleur}
              onChange={handleEpicInputChange}
            />
          </div>
          <div style={{ "text-align": "center", "margin-bottum": "10px" }}>
            <button
              type="submit"
              class="btn"
              style={{
                color: "white",
                "background-color": "rgba(95, 36, 159, 0.87)",
                margin: "1px",
                "border-radius": "5px",
              }}
            >
              Update
            </button>
            <button
              onClick={handeldelete}
              class="btn"
              style={{
                color: "white",
                "background-color": "red",
                margin: "1px",
                "border-radius": "5px",
              }}
            >
              Delete
            </button>
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
}

export default UpdateEpic;
