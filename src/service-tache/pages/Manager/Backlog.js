import React, { useState,useEffect } from "react";
import "./Manager.css";
import { IoIosAdd } from "react-icons/io";
import * as IoIcons from "react-icons/io";
import { FcParallelTasks } from "react-icons/fc";
import { IoMdPaper } from "react-icons/io";
import { FaPersonRunning } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Grid } from "@material-ui/core";


//onClick={alert("hello yassine")}
function Backlog() {
  //use States:
  const [Epics,setEpics]= useState([]);;
  const [Tasks,setTasks]= useState([]);;
  const [Sprints,setSprints]= useState([]);;
  const [selectedItem, setSelectedItem] = useState('');

  //api call to get all epics
  useEffect(() => {
    fetchDataFromApi()
      .then(data => {
        setEpics(data); // Assuming data is an array of objects
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch('http://localhost:8083/SERVICE-TACHE/epic/AllEpics');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data from API');
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

  const handleEpicSelectChange = event => {
    setSelectedItem(event.target.value);
  };

  return (
    <>
    
      <div className="sidenav2">
        <button>
          <IoMdPaper size={"40px"} />
        </button>
        <br />
        <br />
        <button>
      
          <FaPersonRunning size={"40px"} />
        
        </button>
        <br />
      </div>

      <div class="main2">
        <h1>Menu</h1>

        <Grid container>
          <div>
            <button
              type="button"
              class="btn "
              style={{
                "background-color": "rgba(95, 36, 159, 0.87)",
                "border-radius": "10px",
                color: "white",
                "margin-bottom": "5px",
                "margin-left": "5px",
                fontSize: "15px",
              }}
              onClick={() => {
                HideShow({ name: "addItem" });
              }}
            >
              Add Item
            </button>
            <button
              className="btn"
              style={{
                "background-color": "rgba(0, 105, 117, 0.87)",

                "border-radius": "10px",
                color: "white",
                "margin-bottom": "5px",
                "margin-left": "5px",
                fontSize: "15px",
              }}
              onClick={() => {
                HideShow({ name: "AddSprint" });
              }}
            >
              Add Sprint
            </button>
            <button
              className="btn"
              style={{
                "background-color": "rgba(0, 150, 143, 0.87)",

                "border-radius": "10px",
                color: "white",
                "margin-bottom": "5px",
                "margin-left": "5px",
                fontSize: "15px",
              }}
              onClick={() => {
                HideShow({ name: "AddEpic" });
              }}
            >
              Add Epic
            </button>

            <div class="form-group " style={{ margin: "20px" }}>
              <label for="inputState">Filter</label>
              <select value={selectedItem} onChange={handleEpicSelectChange} className="form-control">
        <option value="">Select an item</option>
        {Epics.map(item => (
          <option key={item.id_epic} value={item.id_epic}>
            {item.nom_epic}
          </option>
        ))}
      </select>
            </div>
          </div>
          <table className="tabl table" style={{ "font-size": "17px" }}>
            <thead>
              <tr>
                <th style={{ padding: "0px",color:"white" }} scope="col"></th>
                <th scope="col" style={{ padding: "0px",color:"white" }}>
                  Nom
                </th>
                <th scope="col" style={{ padding: "0px",color:"white" }}>
                  Description
                </th>
                <th scope="col" style={{ padding: "0px",color:"white" }}>
                  Progress
                </th>
              </tr>
            </thead>
            
            <tr style={{"border":"rgba(95, 36, 159, 0.87) solid 0.5px"}}>
              <th
                scope="row"
                style={{
                  "background-color": "rgba(95, 36, 159, 0.87)",
                  color: "white",
                  width: "5px",
                  "margin-right": "20px",
                  padding: "4px",
                }}
              ></th>
              <td style={{ paddingLeft: "10px","border":"rgba(95, 36, 159, 0.87) solid 0.5px","text-align":"center" }}>Jacob</td>
              <td style={{"border":"rgba(95, 36, 159, 0.87) solid 0.5px","text-align":"center"}}>Thornton</td>
              <td style={{"border":"rgba(95, 36, 159, 0.87) solid 0.5px","text-align":"center"}}>Thornton</td>
              <td style={{ width: "130px", paddingLeft: "10px" }}>
                <button
                  style={{
                    backgroundColor: "white",
                    border: "1px white solid",
                    padding: "1px",
                  }}
                  onClick={() => {
                    HideShow({ name: "AddTaches" });
                  }}
                >
                  <FcParallelTasks size={30} />
                </button>

                <button
                  style={{
                    backgroundColor: "white",
                    border: "1px white solid",
                    padding: "1px",
                  }}
                  onClick={() => {
                    HideShow({ name: "AddItem" });
                  }}
                >
                  <FiEdit size={30} color="green" />
                </button>
                <button
                  style={{
                    backgroundColor: "white",
                    border: "1px white solid",
                    padding: "1px",
                  }}
                  onClick={() => {
                    HideShow({ name: "AddItem" });
                  }}
                >
                  <MdOutlineDeleteForever size={30} color="red" />
                </button>



              </td>
            </tr>
          </table>
        </Grid>
      </div>
    </>
  );
}

export default Backlog;
