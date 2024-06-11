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
import TerminerSprint from "./terminersprint";
import Terminersprintfull from "./terminersprintfull";
import { Card } from "@material-ui/core";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function SprintCard({
  rd,
  r,
  userst,
  id,
  datedebut,
  datefin,
  des,
  etat,
  idprojet,
  nom,
}) {
  const [formsprintData, setformsprintData] = useState({
    id_sprint: id,
    etatsprint: etat,
    idProjet: idprojet,
    nom_sprint: nom,
    description: des,
    datefin: datefin,
    datedebut: datedebut,
  });
  const [cr,setcr]= useState("grey");
  //modify coior :
function midfycolor(){
  if(formsprintData.etatsprint=="FAIT"){
    return("green");
  }
  if(formsprintData.etatsprint=="ENCOURS"){
    return("orange");
  }
  if(formsprintData.etatsprint=="AFAIRE"){
    return("grey");
  }
}
  const [stories, setStories] = useState([]);
  const [reloadsprint,setreloadsprint]=useState(0);
  const [countdown, setCountdown] = useState(null);
  const [isSprintStarted, setIsSprintStarted] = useState(false);

  function HideShow(divtohide) {
    var x = document.getElementById(divtohide.name);
    
    if(x){
      if (x.style.visibility == "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
        x.style.visibility = "visible";
      }
    }
    
   
  }


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8083/SERVICE-TACHE/sprint/sprint/"+id); 
      const data = await response.json();
      setStories(data.userStories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [reloadsprint]);




  const handlesprintInputChange = (event) => {
    const { name, value } = event.target;
    if(name=="etatsprint"){
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
    setformsprintData({ ...formsprintData, [name]: value,idProjet:idprojet });
  };
//timeout

useEffect(() => {
  let intervalId;
  
  if (isSprintStarted) {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTime = new Date(formsprintData.datefin).getTime();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        setCountdown('Sprint ended!');
        clearInterval(intervalId);
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  }

  return () => clearInterval(intervalId);
}, [isSprintStarted, formsprintData.datefin]);




  //end sprint

  const fetchsprintFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-TACHE/sprint/sprint/"+id,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await response.json();
      setStories(data.userStories);
     
      return data;
    } catch (error) {
      console.log("cant get data");
      throw new Error("Failed to fetch data from API");
    }
  };


  function endsprint(event) {
    event.preventDefault();
   
   
   
      if(stories.filter(b=>b.etat!="FAIT").length==0){
        setreloadsprint(reloadsprint+1);
        HideShow({ name: "terminerSprint"+id });

      }else{
        setreloadsprint(reloadsprint+1);
        HideShow({ name: "terminerSprintfull"+id });
      }
   
      setIsSprintStarted(false);
      setCountdown(null);
   
    console.log("stooooooooooooooooooooooooooris");
    console.log(stories.length);

   
  }

  

  




  //update sprint
  function startsprint(event) {
    event.preventDefault();
    if (formsprintData.datedebut === "" || formsprintData.datefin === "") {
      alert("You have to set start and end date before starting the sprint!!");
    } else {
      if (userst == null) {
        alert(
          "you have to add at leaste one backlog item inside your sprint before starting the sprint !!"
        );
      } else {
        if (userst.length == 0) {
          alert(
            "you have to add at leaste one backlog item inside your sprint before starting the sprint !!"
          );
        } else {
          setformsprintData({ ...formsprintData, etatsprint: "ENCOURS" });
          const sm = handlesprintSubmit(event);
          setIsSprintStarted(true);
          handlesprintSubmit(event);
        }
      }
    }
  }

  const handlesprintSubmit = async (event) => {
    event.preventDefault();

    if (formsprintData.datedebut !== "" && formsprintData.datefin !== "") {
      var datedebut = new Date(formsprintData.datedebut);
      var datefin = new Date(formsprintData.datefin);
      if (datedebut.getTime() < datefin.getTime()) {
        try {
          const response = await fetch(
            "http://localhost:8083/SERVICE-TACHE/sprint/update/" + formsprintData.id_sprint,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formsprintData),
            }
          );
          console.log("Response:", response);
        } catch (error) {
          console.error("Error:", error);
          alert("Can't update " + id);
        }

        rd(r+1);
      } else {
        alert("Start date should be before end date");
      }
    }
  };

  function Remove(event) {
    event.preventDefault();
    try {
      const response = fetch(
        "http://localhost:8083/SERVICE-TACHE/sprint/delete/" + formsprintData.id_sprint,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }

    rd(r+1);
  }

  return (
    <>
          <TerminerSprint nom={nom} number={stories.length} formsprintData={formsprintData} idprojet={idprojet} id={id} rd={rd} r={r}/>
          <Terminersprintfull nom={nom} number={stories.length} formsprintData={formsprintData} idprojet={idprojet} id={id} ended={stories.filter(s=>s.etat=="FAIT")} rd={rd} r={r} opn={stories.filter(s=>s.etat!="FAIT")} idp={idprojet}  />

      <form>
        <div
          style={{
            fontSize: "14px",
            borderRadius: "7px",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <input
            style={{
              fontSize: "14px",
              color: "black",
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "7px",
              width: "80px",
              fontWeight: "bold",
              border: "solid 1px white",
            }}
            name="nom_sprint"
            value={formsprintData.nom_sprint}
            onChange={handlesprintInputChange}
          />
          <input
            style={{
              marginLeft: "7px",
              width: "200px",
              borderRadius: "5px",
              color: "black",
              border: "white solid 1px",
            }}
            name="description"
            value={formsprintData.description}
            onChange={handlesprintInputChange}
          />

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

          <span
            style={{
              backgroundColor: "white",
              border: "#6B2FFF solid 1px",
              borderRadius: "6px",
              float: "right",
            }}
          >
            <input
              type="datetime-local"
              style={{
                backgroundColor: "white",
                borderLeft: "#6B2FFF solid 1px",
                borderRadius: "0px",
                padding: "1px",
                float: "right",
                width: "150px",
                fontSize: "14px",
              }}
              name="datedebut"
              value={formsprintData.datedebut}
              onChange={handlesprintInputChange}
              className="form-control"
            ></input>

            <span
              style={{
                marginLeft: "4px",
                padding: "3px",
                float: "right",
              }}
            >
              start :
            </span>
          </span>

          <span
            style={{
              backgroundColor: "white",
              border: "#6B2FFF solid 1px",
              borderRadius: "6px",
              float: "right",
            }}
          >
            <input
              type="datetime-local"
              style={{
                backgroundColor: "white",
                borderLeft: "#6B2FFF solid 1px",
                borderRadius: "0px",
                fontSize: "14px",
                padding: "1px",
                float: "right",
                width: "150px",
              }}
              name="datefin"
              value={formsprintData.datefin}
              onChange={handlesprintInputChange}
              className="form-control"
            ></input>
            <span
              style={{
                marginLeft: "4px",
                padding: "3px",
                float: "right",
              }}
            >
              end :
            </span>
          </span>

          <select
            style={{
              color:"white",
              backgroundColor:midfycolor(),
              border: "#6B2FFF solid 1px",
              borderRadius: "5px",
              padding: "4px",
              float: "right",
              width: "100px",
            }}
            name="etatsprint"
            value={formsprintData.etatsprint}
            onChange={handlesprintInputChange}
            placeholder="EPIC"
            className="form-control"
          >
             <option style={{backgroundColor:"white",color:"black"}} value="AFAIRE">A FAIRE</option>
            <option  style={{backgroundColor:"white",color:"black"}} value="ENCOURS">EN COURS</option>
            <option style={{backgroundColor:"white",color:"black"}} value="FAIT">FAIT</option>
          </select>

          <button
            id={"startsprintinput" + id}
            className="btn"
            style={{
              color: "#343434",
              fontSize: "14px",
              backgroundColor: "#C8C7C6",
              float: "right",
              marginRight: "5px",
            }}
            onClick={startsprint}
          >
            Start Sprint
          </button>

          <button
            id={"endsprintinput" + id}
            className="btn btn-success"
            style={{
              fontSize: "14px",
              float: "right",
              marginRight: "5px",
            }}
            onClick={endsprint}
          >
            End Sprint
          </button>
          <div>
            <Card style={{ width: "100px", marginTop: "20px" }}>
              <AccessAlarmIcon sx={{ color: "#330072" }} />
              {countdown && <span>{countdown}</span>}
            </Card>
          </div>
        </div>
      </form>
    </>
  );
}

export default SprintCard;
