import { Grid } from "@mui/material";
import React from "react";
import EpicCard from "./EpicCard";
import { FaCaretSquareDown } from "react-icons/fa";
import AddEpic from "./AddEpic";
import AddItem from "./AddItem";
import AddSprint from "./AddSprint";
import { useState, useEffect } from "react";
import BacklogCard from "./BacklogCard";
import SprintCard from "./SprintCard";
import Menu3navbar from "../../../Home/components/Menu3navbar";
import BacklogdivCard from "./BacklogdivCard";
import { useParams } from 'react-router-dom';
import SideBar from "../../../Home/components/SideBar";
import Menu3 from "../../../Home/components/Menu3";
import Absenceotification from "../../../Home/components/Absenceotification";

function BacklogJira() {
  const { projectid } = useParams();
  const [Epics, setEpics] = useState([]);
  const [Backlogs, setBacklogs] = useState([]);
  const [Sprints, setSprints] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [projets, setprojets] = useState([]);
const [idprojet,setidprojet]= useState(projectid);
  const [filter, setfilter] = useState([]);
  const [reload,setreload]=useState(0);
const [sort,setsort]=useState(0);
  














  const handleDragOver = (e) => {
    e.preventDefault();

  };
  function extractLeadingNumbers(input) {
    const regex = /\d+$/;
    const match = input.match(regex);
    return match ? match[0] : null;
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedElementId);
    const dropZone = document.getElementById("dropZonebacklog");
    if (draggedElement && dropZone && draggedElementId != "dropZonebacklog") {
    //  dropZone.appendChild(draggedElement);
      setDragging(null);

      //hadel prsestance of the geted item
      const foundItem = Backlogs.find(
        (backlog) =>
          backlog.id_backlog == extractLeadingNumbers(draggedElementId)
      );
      foundItem.sprint = null;
      try {
        const response = fetch(
          "http://localhost:8083/SERVICE-TACHE/backlog/update/" +
            extractLeadingNumbers(draggedElementId),
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foundItem),
          }
        );
        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
      setreload(reload+1);
    }
  //  window.location.reload();
  };


//handel select project

  const handleprojetSelectChange = (event) => {
  
    const { name, value } = event.target;
setidprojet(value);    
    
  };


  //sorting
 function sortbacklog(){
  if(sort==0){setsort(1);}

 }


  //fetching epics from server
  useEffect(() => {

    fetchProjectsFromApi()
      .then((data) => {
        setprojets(data);
      })
      .catch((error) => {
        console.error("Error fetching backlogs data:", error);
      });

    fetchDataFromApi()
      .then((data) => {
        setEpics(data);
      })
      .catch((error) => {
        console.error("Error fetching epics data:", error);
      });

    fetchSprintsFromApi()
      .then((data) => {
        setSprints(data);
      })
      .catch((error) => {
        console.error("Error fetching epics data:", error);
      });

    fetchBacklogsFromApi()
      .then((data) => {
        setBacklogs(data);
      })
      .catch((error) => {
        console.error("Error fetching backlogs data:", error);
      });

      
  }, [idprojet,sort,reload]);
  
      
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/epic/findProjectEpics/"+idprojet,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("cant get data");
      throw new Error("Failed to fetch data from API");
    }
  };





  const fetchProjectsFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-GESTIONPROJETS/projet/Getbyemployee/"+(JSON.parse(sessionStorage.getItem("UserInfo"))).id,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await response.json();

      return data;

    } catch (error) {
        console.log("cant get data");
      throw new Error("Failed to fetch data from API");
    }
  };



  
  const fetchBacklogsFromApi = async () => {
    try {

let url1="";
if(sort==1){
  url1="http://localhost:8083/SERVICE-TACHE/backlog/findProjectBacklogsSorted/"+idprojet;
}else{
  url1="http://localhost:8083/SERVICE-TACHE/backlog/findProjectBacklogs/"+idprojet;
}
      const response = await fetch(
        url1
      );
      const data = await response.json();
      console.log("data backlogs   :"+data);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch data from API");
    }
  };

  const fetchSprintsFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/sprint/findProjectSprints/"+idprojet
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch data from API");
    }
  };

  function HideShow(divtohide) {
    var x = document.getElementById(divtohide.name);
    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
      x.style.visibility = "visible";
    }
  }
  function filterBacklogs(id) {
    if (filter.includes(id)) {
      setfilter(filter.filter((item) => item !== id));
    } else {
      setfilter([...filter, id]);
    }
  }


  if(projets.length!=0){
    
 
  return (
    
    <div>
      <AddEpic idp={idprojet} rd={setreload} r={reload} />
      <AddItem Epics={Epics} idp={idprojet}  emps={(projets.find(p=>p.id==idprojet)).empployees} rd={setreload} r={reload} />
      <AddSprint idp={idprojet} rd={setreload} r={reload}/>

     <Menu3 rd={setreload} r={reload} />
     <Absenceotification  rd={setreload} r={reload} />

      <Grid
        xs={12}
        spacing={2}
        style={{
          marginLeft: "0px",
          marginTop: "20px",
          borderLeft: "solid black 1px",
          padding: "1px",
          backgroundColor: "rgba(217, 217, 214, 0.5)",
                  }}
      >
        <div style={{"width": "100%",
  "display": "flex",
  "justify-content": "center"}}>

        <div
          style={{
            backgroundColor:"#4528A7",color:"white",borderRadius:"10px",
           
            "display": "flex",
            "justify-content": "center",
           
          
          }}
        >
          
            <b style={{margin:"5px"}}>PROJECT : </b>
      
          <select
name=""
value={idprojet}
onChange={handleprojetSelectChange}

            style={{
                        
              backgroundColor: "white",
              "border": "#6B2FFF solid 1px",
              
              "border-radius": "7px",
              fontWeight:"bold",
float:"right",
height:"auto",
width:"160px",
              textAlign:"center",
         
            }}
            
            
            className="form-control"
          >
             {projets.map((item) => {
         

          return (
            <option key={item.id} value={item.id}>
              {item.nom}
            </option>
          );
        })}
          </select>
        </div>

        </div>
        
        <br></br>

        <Grid
          item
          style={{
            height: "100%",
            overflow: "auto",
            minWidth: "700px",
            "border-radius": "7px",
            padding: "10px",
            borderRadius: "12px",
            
            paddingLeft: "0.7%",
            paddingRight: "0.7%",
            paddingTop: "2%",
            paddingBottom: "1%",
            margin: "4px",
          }}
          xs={1.9}
        >

            
              <b style={{backgroundColor:"white",padding:"10px",fontSize:"20px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>EPICS</b>
            


          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div style={{ height: "100%", overflow: "auto" }}>
              <button
                className="btn "
                style={{
                  float: "right",
                  color: "white",

                  backgroundColor: "#330072",
                }}
                onClick={() => {
                  HideShow({ name: "AddEpic" });

                }}
              >
                Add Epic
              </button>

              <button
                className="btn "
                style={{
                  float: "right",
                  color: "white",

                  backgroundColor: "#FF7000",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setfilter([]);
                  for (let i = 0; i < Epics.length; i++) {
                    var x = document.getElementById("epic" + Epics[i].id_epic);
                    x.style.border = "solid 1px black";
                  }
                }}
              >
                Reset Filter
              </button>

              <div
                style={{
                  border: "solid #6F6F6F 1px",
                  width: "100%",
                  "margin-top": "32px",
                  minWidth: "1000px",
                  "margin-bottom": "5px",
                }}
              >
                {""}
              </div>
              <div style={{ height: "20vh", overflow: "auto" }}>
                {Epics.map((item) => (
                  <div
                    onClick={() => {
                      filterBacklogs(item.id_epic);
                      var x = document.getElementById("epic" + item.id_epic);
                      if (x.style.borderColor == "orange") {
                        x.style.border = "solid 1px black";
                      } else {
                        x.style.border = "solid 3px orange";
                      }
                    }}
                  >
                    <EpicCard 
                    r={reload}
                    rd={setreload}
                      idp={item.idProjet}
                      nom={item.nom_epic}
                      color={item.couleur}
                      des={item.description}
                      id={item.id_epic}
                      backlog={item.userStories}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Grid>
        <br></br>

        <Grid xs={8}>
          {/*backlog */}
          <Grid
            item
            style={{
              
              "border-radius": "7px",
              padding: "10px",
              borderRadius: "12px",
              
              paddingLeft: "0.7%",
              paddingRight: "0.7%",
              paddingTop: "2%",
              paddingBottom: "1%",
              margin: "4px",
            }}
            xs={12}
          >
                          <b style={{backgroundColor:"white",padding:"10px",fontSize:"20px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>BACKLOG</b>


            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                minWidth:"1000px",
                overflow: "auto",
              }}
            >
              <div class="backlog-header">
                <div className="backlog-progress">
                <span style={{ "font-size": "15px", marginRight: "3px" }}>
                  <b  
                    style={{
                      "margin-right":"5px"
                    }}
                  >Backlog</b>
                </span>
                <div className="epics">
                  <span
                    style={{
                      backgroundColor: "green",
                      
                    }}

                    title="Fait"
                  >
                    {Backlogs.filter((backlog) => backlog.etat === "FAIT"&&backlog.sprint==null).length}
                  </span>

                  <span
                    style={{
                      backgroundColor: "red",
                    }}

                    title="A faire"
                  >
                    {
                      Backlogs.filter((backlog) => backlog.etat === "AFAIRE"&&backlog.sprint==null)
                        .length
                    }
                  </span>

                  <span
                    style={{
                      backgroundColor: "#FF8B00",
                    }}

                    title="En cours"
                  >
                    {
                      Backlogs.filter((backlog) => backlog.etat === "ENCOURS"&&backlog.sprint==null)
                        .length
                    }
                  </span>
                </div>
                </div>
              <div>
              <button
                  className="btn "
                  style={{
                    float:"right",
                    color: "white",
                    backgroundColor: "#330072",
                  }}
                  onClick={() => {
                    HideShow({ name: "addItem" });
                  }}
                >
                  Add Item
                </button>
                <button
                  className="btn "
                  style={{
                    marginRight:"5px",
                    float:"right",
                    color: "black",
                    backgroundColor: "#B8B8B8",
                  }}
                  onClick={() => {
                    sortbacklog();
                  }}
                >
                 sort
                </button>

              </div>
                


              
              </div>

              <div
                style={{
                  border: "solid #6F6F6F 1px",
                 
                  "margin-top": "15px",
                  minWidth: "1000px",
                  
                  marginBottom: "2px",
                }}
              >
                {""}
              </div>
              <div
                id="dropZonebacklog"
                className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ height: "20vh" ,backgroundColor: "#F4F4F4",borderRadius:"8px"}}
              >
                {Backlogs.map((item) => {
                  if (filter.length == 0 && item.sprint == null) {
                 
                    return (
                      <BacklogCard
                     c={Backlogs}

                      r={reload}
                      rd={setreload}
                      emps={(projets.find(p=>p.id==idprojet)).empployees}
                      
                        setDragging={setDragging}
                        fobj={item}
                        key={item.id_backlog}
                        id={item.id_backlog}
                        nom={item.nom_backlog}
                        idprojet={item.idProjet}
                        ep={item.epic}
                        des={item.description}
                        state={item.etat}
                        Epics={Epics}
                        sp={item.sprint}
                        id_employee={item.id_employee}
                        prio={item.prioriter}
                        tasks={item.taches}
                      />
                    );
                  }
                  if (item.epic) {
                    if (
                      filter.includes(item.epic.id_epic) &&
                      item.sprint == null
                    ) {
                      return (
                        <BacklogCard
                       c={Backlogs}

                        r={reload}
                        rd={setreload}
                          setDragging={setDragging}
                          emps={(projets.find(p=>p.id==idprojet)).empployees}
                          fobj={item}
                          key={item.id_backlog}
                          id={item.id_backlog}
                          nom={item.nom_backlog}
                          idprojet={item.idProjet}
                          ep={item.epic}
                          des={item.description}
                          state={item.etat}
                          Epics={Epics}
                          sp={item.sprint}
                          id_employee={item.id_employee}
                          prio={item.prioriter}
                          tasks={item.taches}
                        />
                      );
                    } else {
                      return null;
                    }
                  }
                })}
              </div>
            </div>
          </Grid>
          <br></br> <br></br>
          {/*sprint */}
          <Grid
            item
            style={{
             
              "border-radius": "7px",
              padding: "10px",
              borderRadius: "12px",
              
              paddingLeft: "0.7%",
              paddingRight: "0.7%",
              paddingTop: "2%",
              paddingBottom: "1%",
              margin: "4px",
            }}
            xs={12}
          >
            <div style={{ minWidth:"1000px",
                }}>
                          <b style={{backgroundColor:"white",padding:"10px",fontSize:"20px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>SPRINTS</b>

            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <span style={{ "font-size": "15px", marginRight: "4px" }}>
                <b>Sprint</b>
              </span>
              <span className="pr"
                                    title="Fait"

                style={{
                  
                  color: "white",
                  backgroundColor: "green",
                 
                }}
              >
                {
                  Sprints.filter((backlog) => backlog.etatsprint == "FAIT")
                    .length
                }
                
              </span>

              <span className="pr"
                                  title="A faire"

                style={{
                
                  color: "white",
                  backgroundColor: "red",
                
                }}
              >
                {
                  Sprints.filter((backlog) => backlog.etatsprint == "AFAIRE")
                    .length
                }
              </span>

              <span className="pr"
                                  title="En cours"

                style={{
                  
                  color: "white",
                  backgroundColor: "#FF8B00",
                 
                }}
              >
                {
                  Sprints.filter((backlog) => backlog.etatsprint == "EN COURS")
                    .length
                }
              </span>
              <button
                className="btn "
                style={{
                  color: "white",
                  backgroundColor: "#000080",
                  float: "right",

                  "margin-right": "5px",
                }}
                onClick={() => {
                  HideShow({ name: "AddSprint" });
                }}
              >
                Add Sprint
              </button>

              
              <div
                style={{
                  border: "solid #6F6F6F 1px",
                 
                  "margin-top": "15px",
                  minWidth: "1000px",
                  
                  marginBottom: "2px",
                }}
              >
                {""}
              </div>
              <br></br>
              <div style={{ height: "auto"}}>
                {Sprints.map((item) => (
                  <div>
                 

{item.etatsprint !== 'FAIT' && (
          <div id={item.id_sprint} style={{ height: "auto"}}>
 <SprintCard
 r={reload}
                      rd={setreload}
                      userst={item.userStories}
                      id={item.id_sprint}
                      datedebut={item.datedebut}
                      datefin={item.datefin}
                      des={item.description}
                      etat={item.etatsprint}
                      idprojet={item.idProjet}
                      nom={item.nom_sprint}
                    />
                    <BacklogdivCard
                                           c={Backlogs}
                    r={reload}
                    rd={setreload}
                      emps={(projets.find(p=>p.id==idprojet)).empployees}
                      Epics={Epics}
                      bkg={item.userStories}
                      fl={filter}
                      sprint={item}
                      id={item.id_sprint}
                      setDragging={setDragging}
                    />          </div>
        )}

                   
                   
                  
                  
                  </div>
                ))}
              </div>

              </div>
                          </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
}

export default BacklogJira;
