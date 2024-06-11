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
import Menu3 from "../../../Home/components/Menu3";

function BacklogdivCard({id, setDragging,sprint,bkg,fl, emps,Epics,rd,r,c}) {
  const [Backlogs, setBacklogs] = useState([]);
  const [reloadbacklogs, setreloadbacklogs] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
function changestate(){
  setreloadbacklogs(reloadbacklogs+1);

}


  function extractLeadingNumbers(input) {
   
    const regex = /\d+$/;
    const match = input.match(regex);
       return match ? match[0] : null;
  }

  
   




  const handleDrop = (e) => {

    e.preventDefault();
    changestate();

  rd(r+1);



    const draggedElementId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    const dropZone = document.getElementById("dropZone"+id);

    if (draggedElement && dropZone && draggedElementId !== "dropZone"+id) {
     // dropZone.appendChild(draggedElement);
     
const foundItem = Backlogs.find(backlog => backlog.id_backlog == extractLeadingNumbers(draggedElementId));
if(foundItem){
  foundItem.sprint=sprint;
  try {
    const response = fetch(
      "http://localhost:8083/SERVICE-TACHE/backlog/update/" + extractLeadingNumbers(draggedElementId),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foundItem),
      }
    );
    console.log("foundItem");
    console.log(foundItem);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}







    }

    setDragging(null);
    rd(r+1);
   




  };

  //fetching epics from server
  useEffect(() => {
    
   

    fetchBacklogsFromApi()
      .then((data) => {
        setBacklogs(data);
      })
      .catch((error) => {
        console.error("Error fetching backlogs data:", error);
      });
  }, [reloadbacklogs]);

  

  const fetchBacklogsFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/backlog/AllBacklogs"
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
  
  return (
    <div
    
   
    
    >
   
      <br></br>

      <Grid xs={8}>
        {/*backlog */}
        <Grid
          item
          style={{
            height: "100%",
            
           backgroundColor:"#F4F4F4",
            "border-radius": "7px",
            
            borderRadius: "12px",
          
          padding:"20px",
           
            
          }}
          xs={12}
        >
          

          <div
            style={{
              backgroundColor: "#F4F4F4",
             
              borderRadius: "10px",
            }}
          >
           

           
           
            
            <div  id={"dropZone"+id}
    className="dropZone"
    onDragOver={handleDragOver}
    onDrop={handleDrop} 
   

    
    
    style={{ height: "20vh", overflow: "auto" }}>
              {bkg.map((item) => {
                
                if (fl.length == 0) {
                  return (
                    <BacklogCard
                    c={c}
rd={rd}
r={r}
                    emps={emps}
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
                      sp={sprint}
                      id_employee={item.id_employee}
                      prio={item.prioriter}
                      tasks={item.taches}
                    />
                  );
                }

               
               if(item.epic){
                if (fl.includes(item.epic.id_epic)) {
                  return (
                    <BacklogCard
                    c={c}
                    rd={rd}
r={r}

                    emps={emps}
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
                      sp={sprint}
                      id_employee={item.id_employee}
                      prio={item.prioriter}
                      tasks={item.taches}
                    />
                  );
                }
               }
                else {
                  return null;
                }
              }














                
                )}

            </div>
          </div>
        </Grid>
      </Grid>
      <br></br>
    </div>
  );
}

export default BacklogdivCard;
