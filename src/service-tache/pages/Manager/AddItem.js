import React ,{ useState }from "react";
import { IoMdPaper } from "react-icons/io";
import "./Manager.css";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {IconButton } from '@mui/material';
import {  Card, CardContent, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, OutlinedInput, Grid } from '@mui/material';


function AddItem({Epics,idp,emps,rd,r}) {
  function off() {
    var x = document.getElementById("addItem");
    x.style.visibility = "hidden";
  }

  const [formbacklogData, setformbacklogData] = useState({
    id_backlog:"",
    etat:"AFAIRE",
    idProjet:idp,
    nom_backlog:"",
    description:"",
    id_employee:"",
    prioriter:"",
    employe: null,
    taches: [],
    sprint:null,
    epic:null,
  });
const [cr,setcr]= useState("grey");
  const handleepicSelectChange = (event) => {
   
   
    const { name, value } = event.target;
   if(value==""){
    setformbacklogData({ ...formbacklogData, [name]: null , idProjet: idp })  ;

   }else{
    setformbacklogData({ ...formbacklogData, [name]: Epics.find(epic => epic.id_epic == value), idProjet: idp  })  ;

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
         
    
       setformbacklogData({ ...formbacklogData, [name]: value , idProjet: idp});
  };


// Handle form submission
const handleEpicSubmit = async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch(
      "http://localhost:8083/SERVICE-TACHE/backlog/createBacklog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formbacklogData),
      }
    );
    console.log("Response:", response);
  } catch (error) {
    console.log("formbacklogData------------------------");

  console.log(formbacklogData);
    console.error("Error:", error);
  }
setformbacklogData({...formbacklogData,nom_backlog:"",id_backlog:"",description:"",id_employee:"",prioriter:""});
rd(r+1);
  window.location.reload();

};

 

  function SecondaryBar() {
    return (
      <Box
        sx={{
          height: 30,
        
              padding: '0 16px',
              "border-top-left-radius": "20px",
              "border-top-right-radius": "20px "
        }}
      >

        <IconButton
          aria-label="close"
          onClick={() => { off(); }}
          sx={{
            
            right: 8,
            top: 8,
            color: 'rgb(95, 36, 159)'
          }}
        >
          <CloseIcon />
        </IconButton>

        

      
        
        </Box>
    );
  }

  return (
    <div id="addItem" className="overlay" style={{visibility:"hidden"}}>
      <div className="InnerHidden">
        
        <SecondaryBar />

        <div className="icon-container">
          <IoMdPaper size={"80px"} />
        </div>
        <div className="scrollable-content">
        <form method="post" onSubmit={handleEpicSubmit}>
          <div className="form-group" style={{ marginLeft: "40px" ,marginRight: "40px"}}>
          <TextField id="standard-basic" label="Backlog Name" variant="standard" name="nom_backlog"
            value={formbacklogData.nom_backlog}
            onChange={handlebacklogInputChange} sx={{width:'100%', marginTop: '10px'}}/>
            
          </div>

          <div className="form-group"  style={{ marginLeft: "40px" ,marginRight: "40px"}}>
          <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}

          name="description"
          value={formbacklogData.description}
          onChange={handlebacklogInputChange}

          variant="standard"
          sx={{width:'100%',marginTop: '10px'}}
        />
          </div>

          <div className="form-group"  style={{ marginLeft: "40px" ,marginRight: "40px"}}>
          <TextField
          id="standard-multiline-flexible"
          label="Priority"
          multiline
          name="prioriter"
          value={formbacklogData.prioriter}
          onChange={handlebacklogInputChange}
          pattern="[0-9]"
          maxRows={4}
          variant="standard"
          sx={{width:'100%',marginTop: '10px'}}
        />
          </div>
<br></br><br></br>
          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px",backgroundColor: "white",
              
              padding: "1px",
             
              }}>



                <label>Epic</label>
            <select

style={{
              
  
  backgroundColor: "white",
  
  "border-radius": "10px",
  
  width: "100%",
}}

              select
              label="Epic"
              name="epic"
             onChange={handleepicSelectChange}
              
            >
                        <option  value="">
            
          </option>
              {Epics.map((item) => (
          <option key={item.id_epic} value={item.id_epic}>
            {item.nom_epic}
          </option>
        ))}
            </select>
          </div>


          <br></br><br></br>
          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px",backgroundColor: "white",
              
              padding: "1px",
             
              }}>
                                <label>Employees</label>

            <select

style={{
              
  
  backgroundColor: "white",
  
  "border-radius": "10px",
  
  width: "100%",
}}

              select
              label="Epic"
              name="id_employee"
              value={formbacklogData.id_employee}
              onChange={handlebacklogInputChange}
              
            >
              <option value={0}>
              {}
            </option>

            {emps.map((item) => {

if(item.role!="chef_projet"){
  return (
    <option key={item.id} value={item.id}>
      {item.nom+" "+item.prenom}
    </option>
  );
  }

        })}
            </select>
          </div>





          <br></br><br></br>
          <div className="form-group" style={{ marginLeft: "40px", marginRight: "40px",backgroundColor: "white",
              
              padding: "1px",
             
              }}>
            <select

style={{
              
  
  backgroundColor: cr,
  "color":"white",
  "border-radius": "10px",
  
  width: "100%",
}}

              select
              label="Epic"
              name="etat"
            value={formbacklogData.etat}
            onChange={handlebacklogInputChange}
              
            >
             <option style={{backgroundColor:"white",color:"black"}} value="AFAIRE">A FAIRE</option>
            <option  style={{backgroundColor:"white",color:"black"}} value="ENCOURS">EN COURS</option>
            <option style={{backgroundColor:"white",color:"black"}} value="FAIT">FAIT</option>
            </select>
          </div>

          

          

         


          
         
         <div style={{ "text-align": "center", "margin-bottum": "10px",margin: '10px'}}>
            <button
              type="submit"
              class="btn"
              style={{
                color: "white",
                backgroundColor: 'rgb(51,0,114)',
                margin: "1px",
                "border-radius": "5px",
              }}
              
            >
              Add
            </button>
            {/* <Button sx={{ backgroundColor: 'rgb(51,0,114)', '&:hover': { backgroundColor: 'rgb(95,36,159)', }}}
             variant="contained" type="submit" class="btn"
            >Add</Button> */}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddItem;
