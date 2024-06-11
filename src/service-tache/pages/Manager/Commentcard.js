import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaSquare } from "react-icons/fa";
import { FaCaretSquareDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FcParallelTasks } from "react-icons/fc";
import { IoMdPaper } from "react-icons/io";
import { FaPersonRunning } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlinePicCenter } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import Tachesfrombacklog from "./Tachesfrombacklog";

function  Commentcard({comment,bkl,rd,r
}) {
const [userData,setUserData]=useState([]);
const [isHidden, setIsHidden] = useState(false);
const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/ListEmployee`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("AccessTocken")}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    
  }, []);
  

  const [formcommnetdata, setformcommnetdata] = useState({
    id:comment.id,
    texte:comment.texte,
    idemploye:comment.idemploye,
    date:comment.date,
   backlog:{id_backlog:bkl.id_backlog}
  });





  const handlebacklogInputChange = (event) => {
    const { name, value } = event.target;
  if(name=="texte"){
    setformcommnetdata({...formcommnetdata,texte:value})
  }
     };





  const editecommnet = (event) => {
    event.preventDefault();
    try {
      const response = fetch(
        "http://localhost:8083/SERVICE-TACHE/commentaire/update/" + formcommnetdata.id,
        {
          method: "PUT",
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
  };

  const deletecommnet= (event)=>{
    event.preventDefault();
    try {
      const response = fetch(
        "http://localhost:8083/SERVICE-TACHE/commentaire/delete/" +
          formcommnetdata.id,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
    } catch (error) {}

    rd(r+1);
}


const employee = userData.find(em => em.id === formcommnetdata.idemploye);
  const employeeName = employee ? `${employee.nom || ""} ${employee.prenom || ""}` : "";
  const userInfoData = sessionStorage.getItem("UserInfo");

const userInfoObject = JSON.parse(userInfoData);

const idUserConnecte = userInfoObject.id;
  useEffect(() => {

if(employee){
  if(employee.id!=idUserConnecte){
    
    if(userInfoObject.role!="chef_projet"){
      
    setIsHidden(true);
    }
    }
    
}
    
  }, []);



return (
    <div>
      <div className="scrollable-content">
          <form method="post">
            <div>
              <b style={{ marginLeft: "6%" }}>{employeeName+" Says :"} </b>
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
            <div>
              <b style={{ marginLeft: "6%" }}>{formcommnetdata.date} </b>
            </div>
            <br></br>


            {!isHidden && (
            <div
            style={{
              "text-align": "center",
              "margin-bottum": "10px",
              marginRight: "6%",
            }}
          >
            <button
            onClick={editecommnet}
              class="btn"
              style={{
                float: "right",
                color: "white",
                backgroundColor: "rgb(51,0,114)",
                margin: "1px",
                "border-radius": "5px",
              }}
            >
              Edit
            </button>
            <button
            onClick={deletecommnet}
              class="btn btn-danger"
              style={{
                float: "right",
                margin: "1px",
                "border-radius": "5px",
              }}
            >
              delete
            </button>
          </div>
     
      )}


          </form>
        
        </div>
        <br></br>
     
      </div>
  );
}

export default Commentcard;
