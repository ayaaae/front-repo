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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SideBar from "../../../Home/components/SideBar";
import Absenceitem from "./Absenceitem";
import Menu3 from "../../../Home/components/Menu3";
import Absenceotification from "../../../Home/components/Absenceotification";
import Tablenotif from "./Tablenotif";
import TextField from '@mui/material/TextField';

function Absencelist() {
  const [Demandes, setDemandes] = useState([]);
 
  const [projets, setprojets] = useState([]);
const [idprojet,setidprojet]= useState(4);
  const [filter, setfilter] = useState([]);
  const [reload,setreload]=useState(0);
const [sort,setsort]=useState(0);
const [startDate, setStartDate] = React.useState(null);
const [endDate, setEndDate] = React.useState(null);

  
//handel select project

  const handleprojetSelectChange = (event) => {
  
    const { name, value } = event.target;
setidprojet(value);    
    
  };


  //sorting
 function sortbacklog(){
  if(sort==0){setsort(1);}

 }


  //fetching Demandes from server
  useEffect(() => {

   

    fetchDataFromApi()
      .then((data) => {
        setDemandes(data);
      })
      .catch((error) => {
        console.error("Error fetching Demandes data:", error);
      });

   

    
      
  }, [reload]);
  
      
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/Alldemande",
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

//fetch request by date range

  useEffect(() => {
    if (startDate && endDate) {
      filterRequestsByDateRange();
    }
  }, [startDate, endDate]);

  const filterRequestsByDateRange = async () => {
    try {
      alert(startDate);
      alert(endDate);
      const response = await fetch(
        `http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setDemandes(data);
      } else {
        console.error('No requests found for the given date range.');
        setDemandes([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setDemandes([]);
    }
  };


  



  

  function filterBacklogs(id) {
    if (filter.includes(id)) {
      setfilter(filter.filter((item) => item !== id));
    } else {
      setfilter([...filter, id]);
    }
  }


    
 
  return (
    
    <div>
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
height:"100%"
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

            
              <b style={{backgroundColor:"white",padding:"10px",fontSize:"20px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>REQUESTS</b>
            


          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div style={{ height: "100%", overflow: "auto" }}>

             {/* Start date & end date fields */}

            <br></br>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: 120  }}
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '20px',
                      padding: '0 8px',
                    },
                  }}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: 120 }}
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '30px',
                      padding: '0 10px',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

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
                  for (let i = 0; i < Demandes.length; i++) {
                    var x = document.getElementById("epic" + Demandes[i].id_epic);
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
             <div style={{
                  
                  width: "100%",
                  
                  minWidth: "1000px",
                  
                }} > <Tablenotif  
                r={reload}
                rd={setreload}
               demandes={Demandes} />
                </div>
              <div style={{ height: "80vh", overflow: "auto" }}>
                
              </div>
            </div>
          </div>
        </Grid>
        <br></br>

                </Grid>
      
    </div>
  );

}

export default Absencelist;
