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

function BacklogCard({
c,
  setDragging,
  emps,
  id,
  idprojet,
  sp,
  ep,
  id_employee,
  nom,
  des,
  state,
  Epics,
  prio,
  tasks,
  fobj,
  rd,
  r
}) {
  //lets try
  //ha fin b9it
  const [formbacklogData, setformbacklogData] = useState({
    id_backlog: id,
    etat: state ,
    idProjet: idprojet,
    nom_backlog: nom ,
    description: des ,
    id_employee: id_employee ,
    prioriter: prio ,
    employe: null,
    sprint: sp ,
    epic: ep ,
  });
  const [cr,setcr]= useState("grey");
  //modify coior :
function midfycolor(){
  if(formbacklogData.etat=="FAIT"){
    return("green");
  }
  if(formbacklogData.etat=="ENCOURS"){
    return("orange");
  }
  if(formbacklogData.etat=="AFAIRE"){
    return("grey");
  }
}
  

  const [statecolor, setstatecolor] = useState("");
  function HideShow(divtohide) {
    var x = document.getElementById(divtohide.name);
    if(x){
      if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
      x.style.visibility = "visible";
    }
  }
    }
    

  const handleDragStart = (e) => {
    setDragging("drag" + id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "drag" + id);
  };

  const handleepicSelectChange = (event) => {
  
    const { name, value } = event.target;
    const repic = Epics.find((epic) => epic.id_epic == value);
if(repic){

  setformbacklogData({
    ...formbacklogData,
    [name]: {
      ...formbacklogData.epic,
      id_epic: value,
      nom_epic: event.target.options[event.target.selectedIndex].text,
      couleur: Epics.find((epic) => epic.id_epic == value).couleur,
      idProjet: Epics.find((epic) => epic.id_epic == value).idProjet,
      userStories: Epics.find((epic) => epic.id_epic == value).userStories,
      sprint: Epics.find((epic) => epic.id_epic == value).sprint,
      description: Epics.find((epic) => epic.id_epic == value).description,
    },idProjet: idprojet
  });
}else{
  setformbacklogData({
    ...formbacklogData,
    [name]: null,idProjet: idprojet
  });
}
    
  };

  const handlebacklogInputChange = (event) => {



    
    const { name, value } = event.target;


    if(name=="etat"){
      if(value=="FAIT"){
        setcr("green")
      }
      if(value=="ENCOURS"){
        setcr("orange");
      }
      if(value=="AFAIRE"){
        setcr("grey");
      }
          }
    setformbacklogData({ ...formbacklogData, [name]: value, idProjet:  idprojet });
  };

  //update backlog

  // Handle form submission
  const handleBacklogSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/backlog/update/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formbacklogData),
        }
      );
      console.log(formbacklogData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }

    rd(r+1);
  };
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
})
return s1+" tasks from "+s2;
}
  function Remove(event) {
    event.preventDefault();
    try {
      const response = fetch(
        "http://localhost:8083/SERVICE-TACHE/backlog/delete/" +
          formbacklogData.id_backlog,
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

  return (
    <>
      <Tachesfrombacklog
      c={c}
      comments={fobj.comments}
      rd={rd}
      r={r}
        ide ={id_employee}
      empls={emps}
        taches={tasks}
        idtache={formbacklogData.id_backlog}
        bkl={fobj}
      />

      <form method="POST" onSubmit={handleBacklogSubmit} >
        <div
       
          id={"drag" + id}
          className="draggable"
          draggable
          onDragStart={handleDragStart}
          style={{
            backgroundColor:"white",
            fontSize: "14px",
            cursor: "grab",
          

            "border-radius": "7px",
            borderBottom: "none",
            padding: "5px",
            border: "solid 1px #767676 ",
            
          }}
        >
          <input
            style={{
              fontSize: "14px",
              color: "black",
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "7px",
              width: "8%",
              "font-weight": "bold",
              border: "solid 1px white",
            }}
            name="nom_backlog"
            value={formbacklogData.nom_backlog}
            onChange={handlebacklogInputChange}
          />
          <input
            style={{
              marginLeft: "7px",
              maxWidth: "1160px",
              width: "100%",
              
              borderRadius: "5px",
              color: "black",
              border: "white solid 1px",
              width: "40%",
            }}
            name="description"
            value={formbacklogData.description}
            onChange={handlebacklogInputChange}
          />
          <button
            style={{
              backgroundColor: "white",
              border: "1px white solid",
              padding: "1px",
              float: "right",
            }}
            onClick={(event) => {
              event.preventDefault();
              HideShow({
                name: "Tachesfrombacklog" + formbacklogData.id_backlog,
              });
            }}
          >
            <FcParallelTasks size={20} />
          </button>

          <button
            style={{
              backgroundColor: "white",
              border: "1px white solid",
              padding: "1px",
              float: "right",
            }}
            onClick={() => {
              HideShow({ name: "AddItem" });
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
              Remove(event);
            }}
          >
            <MdOutlineDeleteForever size={20} color="red" />
          </button>

          <FaUserCircle
            size={22}
            style={{
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
            name="id_employee"
            value={formbacklogData.id_employee}
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

          {/*epic select*/}

          <AiOutlinePicCenter
            size={22}
            style={{
              color: "white",
              backgroundColor: ep == null ? "white" : ep.couleur,
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
            name="epic"
            onChange={handleepicSelectChange}
            value={formbacklogData.epic?formbacklogData.epic.id_epic:null}
            className="form-control"
          >
           
           
            <option value={""}>
              {""}
            </option>

            {Epics.map((item) => {

          return (
            <option key={item.id_epic} value={item.id_epic}>
              {item.nom_epic}
            </option>
          );
        })}
           
                  
          </select>

          {/*statut select*/}

         
          <select
            style={{
              color:"white",
              backgroundColor:midfycolor(),
              "border": "#6B2FFF solid 1px",
              
              "border-radius": "7px",
              

              padding: "1px",
              float: "right",
              width: "100px",
            }}
            name="etat"
            value={formbacklogData.etat}
            onChange={handlebacklogInputChange}
            placeholder="EPIC"
            className="form-control"
          >
            <option style={{backgroundColor:"white",color:"black"}} value="AFAIRE">A FAIRE</option>
            <option  style={{backgroundColor:"white",color:"black"}} value="ENCOURS">EN COURS</option>
            <option style={{backgroundColor:"white",color:"black"}} value="FAIT">FAIT</option>
          </select>

          {/*priorite*/}

          <input
            type="number"
            name="prioriter"
            value={formbacklogData.prioriter}
            onChange={handlebacklogInputChange}
            style={{
              color: "black",
              backgroundColor: "#B8B8B8",
              marginLeft: "2px",
              marginRight: "4px",
              textAlign: "center",
              width: "20px",

              padding: "1px",
              float: "right",
              border: "#B8B8B8 solid 1px",
              borderRadius: "30%",
            }}
          />
        </div>
      </form>
    </>
  );
}

export default BacklogCard;
