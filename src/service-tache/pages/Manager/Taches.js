import React from "react";
import Backlog from "./Backlog";
import { FaTasks } from "react-icons/fa";
import "./Manager.css";
import { FaPersonRunning } from "react-icons/fa6";
function AddTaches() {
  function off() {
    var x = document.getElementById("AddTaches");
    x.style.visibility = "hidden";
  }
  return (
    <div
      id="AddTaches"
      className=" overlay"
      style={{ border: "rgba(0, 105, 117, 0.87) solid 1px", padding: "0px",visibility:"hidden" }}
    >
      <div className="container InnerHidden " style={{border: "rgba(0, 105, 117, 0.87) solid 1px"}}>



        <button
          className="btn primary"
          style={{  
            color: "rgba(0, 105, 117, 0.87)",
            "background-color": "white",
            margin: "1px",
            "border-radius": "20px",
            border: "rgba(0, 105, 117, 0.87) solid 1px",
          }}
          onClick={() => {
            off();
          }}
        >
          X
        </button>
        <div style={{ "text-align": "center","margin":"0px"}}>
  
  
  
  <h3 style={{
                color: "white",
                "background-color": "rgba(0, 105, 117, 0.87)",
                padding: "10px",
              }}>Tasks</h3></div>
        <div
          style={{ "text-align": "center", color: "rgba(0, 105, 117, 0.87)" }}
        >
          <FaTasks size={"80px"} />
        </div>
       
        <form>
         
          <div class="form-group " style={{ margin: "20px" }}>
            <label for="inputEmail4">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group " style={{ margin: "20px" }}>
            <label for="inputState">Responsible</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

        

          <div style={{ "text-align": "center", "margin-bottum": "10px" }}>
            <button
              type="submit"
              class="btn"
              style={{
                color: "white",
                "background-color": "rgba(0, 105, 117, 0.87)",
                margin: "1px",
                "border-radius": "5px",
              }}
            >
              Add
            </button>
          </div>
          <br></br>
        </form>
<div style={{"overflow-y": "auto",
    "max-height": "200px","margin":"5px"}}>


<table className="tabl table" >
          <thead >
            <tr  style={{"font-size":"20px","background-color": "rgba(0, 105, 117, 0.87)"}}>
              <th style={{padding:"0px"}}  scope="col"></th>
              <th scope="col" style={{padding:"0px"}}>Description</th>
              <th scope="col" style={{padding:"0px","width":"130px"}}></th>
            </tr>
          </thead>
            <tr style={{"font-size":"20px"}}>
              <th scope="row" style={{"background-color": "rgba(0, 105, 117, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>1</th>
              <td style={{paddingLeft:"10px"}} >Mark</td>
              <td style={{width:"40px"}}><button   className="btn btn-success" style={{"margin-right":"5px"}} >Edit</button><button  className="btn btn-danger" >Delete</button></td>

            </tr>
            <tr style={{"font-size":"20px"}} >
              <th scope="row" style={{"background-color": "rgba(0, 105, 117, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>2</th>
              <td style={{paddingLeft:"10px"}}>Jacob</td>
              <td style={{width:"40px"}}><button   className="btn btn-success" style={{"margin-right":"5px"}} >Edit</button><button  className="btn btn-danger" >Delete</button></td>


            </tr>
            <tr style={{"font-size":"20px"}} >
              <th scope="row" style={{"background-color": "rgba(0, 105, 117, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>2</th>
              <td style={{paddingLeft:"10px"}}>Jacob</td>
              <td style={{width:"40px"}}><button   className="btn btn-success" style={{"margin-right":"5px"}} >Edit</button><button  className="btn btn-danger" >Delete</button></td>


            </tr>
            <tr style={{"font-size":"20px"}} >
              <th scope="row" style={{"background-color": "rgba(0, 105, 117, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>2</th>
              <td style={{paddingLeft:"10px"}}>Jacob</td>
              <td style={{width:"40px"}}><button   className="btn btn-success" style={{"margin-right":"5px"}} >Edit</button><button  className="btn btn-danger" >Delete</button></td>


            </tr>
            <tr style={{"font-size":"20px"}} >
              <th scope="row" style={{"background-color": "rgba(0, 105, 117, 0.87)","color":"white","width":"5px","margin-right":"20px",padding:"4px"}}>2</th>
              <td style={{paddingLeft:"10px"}}>Jacob</td>
              <td style={{width:"40px"}}><button   className="btn btn-success" style={{"margin-right":"5px"}} >Edit</button><button  className="btn btn-danger" >Delete</button></td>


            </tr>
        </table>


</div>
       
      </div>
    </div>
  );
}

export default AddTaches;
