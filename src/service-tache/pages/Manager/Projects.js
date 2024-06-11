import React from "react";
import "./Manager.css";
import { IoIosAdd } from "react-icons/io";
import * as IoIcons from "react-icons/io";
import { FcParallelTasks } from "react-icons/fc";

//onClick={alert("hello yassine")}
function Backlog() {
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
    <>
      <div className="container-fluid">
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
              fontSize:"20px"
            }}
            onClick={() => {
              HideShow({name:"addItem"});
            }}
          >
            Add Item
          </button>
          <button className="btn"  style={{
              "background-color": "rgba(0, 105, 117, 0.87)",
             
              "border-radius": "10px",
              color: "white",
              "margin-bottom": "5px",
              "margin-left": "5px",
              fontSize:"20px"

            }}
            onClick={() => {
              HideShow({name:"AddSprint"});
            }}
            >
              Add Sprint
              </button>
              <button className="btn"  style={{
              "background-color": "rgba(0, 150, 143, 0.87)",
             
              "border-radius": "10px",
              color: "white",
              "margin-bottom": "5px",
              "margin-left": "5px",
              fontSize:"20px"

            }}
            onClick={() => {
              HideShow({name:"AddEpic"});
            }}
            >
              Add Epic
              </button>

            
            
            <select id="inputState" class="form-control " style={{"margin-bottom": "5px","height":"50px","font-size":"30px","border-radius":"50px"}}>
              <option selected>Epic</option>
              <option>...</option>
            </select>
       


        </div>
        <table className="tabl table">
          <thead >
            <tr  style={{"font-size":"20px"}}>
              <th style={{padding:"0px","font-size":"25px"}}  scope="col"></th>
              <th scope="col" style={{padding:"0px","font-size":"25px"}}>Nom</th>
              <th scope="col" style={{padding:"0px","font-size":"25px"}}>Description</th>
            </tr>
          </thead>
            <tr style={{"font-size":"20px"}}>
              <th scope="row" style={{"background-color": "rgba(95, 36, 159, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>1</th>
              <td style={{paddingLeft:"10px"}} >Mark</td>
              <td >Otto</td>
              <td style={{width:"40px",paddingLeft:"10px"}}><button  style={{backgroundColor:"white","border":"1px white solid",padding:"1px"}}  onClick={() => {
              HideShow({name:"AddTaches"});}}><FcParallelTasks size={30} /></button></td>
            </tr>
            <tr style={{"font-size":"20px"}} >
              <th scope="row" style={{"background-color": "rgba(95, 36, 159, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>2</th>
              <td style={{paddingLeft:"10px"}}>Jacob</td>
              <td>Thornton</td>
              <td style={{width:"40px",paddingLeft:"10px"}}><button  style={{backgroundColor:"white","border":"1px white solid",padding:"1px"}}  onClick={() => {
              HideShow({name:"AddTaches"});}}><FcParallelTasks size={30} /></button></td>

            </tr>
          
        </table>
      </div>
    </>
  );
}

export default Backlog;
