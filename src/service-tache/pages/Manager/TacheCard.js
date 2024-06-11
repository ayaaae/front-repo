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
import { IoIosTime } from "react-icons/io";
 
function TacheCard({
  c,
  rd,
  r,
  id,
  nom,
  des,
  state,
  bl,
  duree,
  idemployee,
  emps
}) {
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
 //lets try
  //ha fin b9it
  const [formtachedata, setformtachedata] = useState({
    id_tache: id ,
    etat_tache: state ,
    nom_tache: nom ,
    description_tache: des ,
    backlog: {
      
      id_backlog:bl.id_backlog,
      etat: bl.etat,
      idProjet: bl.idProjet,
      nom_backlog: bl.nom_backlog,
      description: bl.description,
      id_employee: bl.id_employee,
      prioriter: bl.prioriter,
      employe: bl.employe,
      sprint: bl.sprint,
      epic: bl.epic,



    },
    idemployee:idemployee,
    duree:duree,
  });

  
  
  const handlebacklogInputChange = (event) => {
    const { name, value } = event.target;
    setformtachedata({ ...formtachedata, [name]: value });
  };


 


// Handle form submission
const handleBacklogSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch(
      "http://localhost:8083/SERVICE-TACHE/Taches/update/" + formtachedata.id_tache,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formtachedata),
      }
    );
    console.log(formtachedata.backlog.idprojet);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
 






 // rd(r+1);
};



function Remove(event){
  event.preventDefault();
  try {
    const response =  fetch(
      "http://localhost:8083/SERVICE-TACHE/Taches/delete/" + formtachedata.id_tache  ,
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response);
  } catch (error) {
    
  }

  







  rd(r+1);


}


console.log("datatatatata");
console.log(formtachedata.idemployee);
console.log(emps);

const employee = emps.find(em => em.id === formtachedata.idemployee);
  const employeeName = employee ? `${employee.nom || ""} ${employee.prenom || ""}` : "";




  return (
    <>
         

      <form method="POST" onSubmit={handleBacklogSubmit}>

        <div
        onClick={(event) => {
          event.stopPropagation();
         
          //Remove(event);
        }}
          style={{
            
            margin:"auto",
            "border-radius": "7px",
            padding: "9px",
            border: "solid 1px #767676 ",
            width: "90%",
          
          }}
        >
          <input
            style={{
              "font-size": "15px",
              color: "black",
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "7px",
              border:"white solid 1px",
              width: "8%",
              "font-weight": "bold",
              
            }}
            name="nom_tache"
            value={formtachedata.nom_tache}
            onChange={handlebacklogInputChange}
          />
          <input
            style={{
              marginLeft: "7px",
              maxWidth: "1160px",
              width: "100%",
              overflow: "scroll",
              borderRadius: "5px",
              color: "black",
              border: "white solid 1px",
              width: "40%",
            }}
            name="description_tache"
            value={formtachedata.description_tache}
            onChange={handlebacklogInputChange}
          />
         

          <button
          type="submit"
            style={{
              backgroundColor: "white",
              border: "1px white solid",
              padding: "1px",
              float: "right",
            }}
            onClick={(event) => {
              event.stopPropagation();
            
            }}
          >
            <FiEdit size={20} color="green" />
          </button>
          <button
            style={{
              backgroundColor: "white",
              border: "1px white solid",
              padding: "1px",
              float: "right",
            }}
            onClick={(event) => {
              event.stopPropagation();
              Remove(event);
            }}
          >
            <MdOutlineDeleteForever size={20} color="red" />
          </button>

        

      
          {/*statut select*/}

          <GrStatusGoodSmall
            size={22}
            style={{
              marginLeft: "2px",
              backgroundColor: "white",
              padding: "1px",
              float: "right",
              "border-right": "#6B2FFF solid 1px",
              "border-top": "#6B2FFF solid 1px",
              "border-bottom": "#6B2FFF solid 1px",
              "border-top-right-radius": "7px",
              "border-bottom-right-radius": "7px",
            }}
          />
          <select
            style={{
              "border-left": "#6B2FFF solid 1px",
              "border-top": "#6B2FFF solid 1px",
              "border-bottom": "#6B2FFF solid 1px",
              "border-radius": "0px",
              "border-top-left-radius": "7px",
              "border-bottom-left-radius": "7px",

              padding: "1px",
              float: "right",
              width: "100px",
            }}
            name="etat_tache"
            value={formtachedata.etat_tache}
            onChange={handlebacklogInputChange}
            placeholder="EPIC"
            className="form-control"
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
          <FaUserCircle
            
            size={22}
            style={{
              marginRight:"5px",
              backgroundColor: "white",
              padding: "1px",
              float: "right",
              "border-right": "#6B2FFF solid 1px",
              "border-top": "#6B2FFF solid 1px",
              "border-bottom": "#6B2FFF solid 1px",
              "border-top-right-radius": "7px",
              "border-bottom-right-radius": "7px",
            }}
          />
          <select
            style={{
              marginLeft: "4px",
              backgroundColor: "white",
              "border-left": "#6B2FFF solid 1px",
              "border-top": "#6B2FFF solid 1px",
              "border-bottom": "#6B2FFF solid 1px",
              "border-radius": "0px",
              "border-top-left-radius": "7px",
              "border-bottom-left-radius": "7px",

              padding: "1px",
              float: "right",
              width: "100px",
            }}
            name="idemployee"
            value={formtachedata.idemployee}
            onChange={handlebacklogInputChange}
            className="form-control"
          >
              <option value={0}>
              {}
            </option>

            {emps.map((item) => {

if(item.role!="chef_projet"){
  return (
    <option key={item.id} value={item.id} title={work(item.id)} >
      {item.nom+" "+item.prenom+"->"+item.role}
    </option>
  );
  }


        })}
          </select>



          <IoIosTime

            
            size={22}
            style={{
              marginRight:"5px",
              backgroundColor: "white",
              padding: "1px",
              float: "right",
              "border-right": "#6B2FFF solid 1px",
              "border-top": "#6B2FFF solid 1px",
              "border-bottom": "#6B2FFF solid 1px",
              "border-top-right-radius": "7px",
              "border-bottom-right-radius": "7px",
            }}
          />
          <input
          type="number"
          placeholder="Time In Hours"
            style={{
              marginLeft: "4px",
              backgroundColor: "white",
              "border-left": "#6B2FFF solid 1px",
              "border-top": "#6B2FFF solid 1px",
              "border-bottom": "#6B2FFF solid 1px",
              "border-radius": "0px",
              "border-top-left-radius": "7px",
              "border-bottom-left-radius": "7px",

              padding: "1px",
              float: "right",
              width: "30px",
            }}
            name="duree"
            value={formtachedata.duree}
            onChange={handlebacklogInputChange}
            className="form-control"
          >
            
          </input>

        
        </div>
      </form>
    </>
  );
}

export default TacheCard;
