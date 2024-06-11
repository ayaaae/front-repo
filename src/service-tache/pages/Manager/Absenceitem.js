import { Grid } from '@mui/material';
import React from 'react';
import { FaSquare } from "react-icons/fa";
import { FaCaretSquareDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import UpdateEpic from './UpdateEpic';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { IoDocumentAttachOutline } from "react-icons/io5";


function Absenceitem({demande,r,rd}) {


    function HideShow(divtohide) {
        var x = document.getElementById(divtohide.name);
        if (x.style.visibility === "hidden") {
          x.style.visibility = "visible";
        } else {
          x.style.visibility = "hidden";
          x.style.visibility = "visible";
        }
      } 

      const [formabsenceData, setformabsenceData] = useState({});
      const [cr,setcr]= useState("grey");
      const [files, setFiles] = useState([]);

      useEffect(() => {
        fetchFiles();
      }, []);
    
      const fetchFiles = async () => {
        try {
          const response = await axios.get('http://localhost:3002/files');
          setFiles(response.data);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };
      useEffect(() => {
if(demande){
  setformabsenceData({
    id: demande.id ,
    etat: demande.etat,
    datedebut: demande.datedebut,
    datefin: demande.datefin,
    datedemand: demande.datedemand,
    motif: demande.motif ,
    iddestination: demande.iddestination,
    idsource: demande.idsource,
    nomcompletsource: demande.nomcompletsource ,
  });  
}
   

       
    
        
          
      }, [demande]);

if(demande){
  const id = demande.id;
    



  //modify coior :
function midfycolor(){
  if(formabsenceData.etat=="APPROVED"){
    return("green");
  }
  if(formabsenceData.etat=="UNREAD"){
    return("orange");
  }
  if(formabsenceData.etat=="REJECTED"){
    return("grey");
  }
}



const handleabsenceInputChange = (event) => {




  const { name, value } = event.target;


  if(name=="etat"){
    if(value=="APPROVED"){
      setcr("green")
    }
    if(value=="UNREAD"){
      setcr("orange");
    }
    if(value=="REJECTED"){
      setcr("grey");
    }
        }
  setformabsenceData({ ...formabsenceData, [name]: value});
  alert(formabsenceData.etat);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const startDate = formatDate(formabsenceData.datedebut);
const endDate = formatDate(formabsenceData.datefin);
const formattedString = `${startDate} TO ${endDate}`;
const differenceInTime = (new Date(formabsenceData.datefin)).getTime() - (new Date(formabsenceData.datedebut)).getTime();
const differenceInDays = differenceInTime / (1000 * 3600 * 24);
function remove(event) {
event.preventDefault();
try {
  const response = fetch(
    "http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/delete/" +
   id,
    {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Response:", response);
  console.lod("id :"+demande.id)
} catch (error) {
  console.error("Error:", error);
}


window.location.reload();  

}


function repond(event) {
event.preventDefault();
try {
  const response =  fetch(
    "http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/update/" +  id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formabsenceData),
    }
  );
  console.log("######################################");

  console.log(JSON.stringify(formabsenceData));
  console.log("Response:", response);
} catch (error) {
  console.error("Error:", error);
}

rd(r+1);
}

return (
<>


<div  style={{"background-color":"#F9F9F9","margin-bottom":"4px","margin-left":"4px","margin-right":"4px"  ,"border-radius":"7px",border:"solid 1px #767676 ",textAlign:"center",fontFamily:"math"}}>
<div style={{"width": "100%",
"display": "flex",
"justify-content": "center"}}>
<select
        style={{
          color:"white",
          backgroundColor:midfycolor(),
          "border": "#767676 solid 1px",
          
          "border-radius": "6px",
          textAlign:"center",

          padding: "1px",
          width: "200px",
          borderTop:"none",
        }}
        name="etat"
        value={formabsenceData.etat}
        onChange={handleabsenceInputChange}
        className="form-control"
      >
        <option style={{backgroundColor:"white",color:"black"}} value="REJECTED">REJECTED</option>
        <option  style={{backgroundColor:"white",color:"black"}} value="UNREAD">UNREAD</option>
        <option style={{backgroundColor:"white",color:"black"}} value="APPROVED">APPROVED</option>
      </select>
      </div>
      <div style={{"width": "100%",
"display": "flex",
"justify-content": "center"}}>
<span style={{"font-size":"15px",margin:"5px",backgroundColor:"white"}}><b>{formattedString}</b></span><span style={{
          color: "black",
          backgroundColor: "#B8B8B8",
          textAlign: "center",
          width: "20px",
          height:"20px",
          margin:"5px",
          
          border: "#B8B8B8 solid 1px",
          borderRadius: "30%",
        }}>{differenceInDays}</span>
      </div>



<span style={{"font-size":"15px",float:"left",marginLeft:"5px"}}><b>{formabsenceData.nomcompletsource+" :"}</b></span>


<div
          className="form-group"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <textarea
          readOnly
            id="standard-basic"
            label="Task Name"
            variant="standard"
            name="motif"
            value={formabsenceData.motif}
            onChange={handleabsenceInputChange}
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div> 
        <form method='post'>
        <button
        onClick={(event) => {
          repond(event);
        }}
          class="btn"
          style={{
          backgroundColor:"#0568D3",
            fontSize:"14px",
            float: "right",
            color: "white",
            margin: "1px",
            "border-radius": "5px",
          }}
        >
          Send
        </button>
        <button
        onClick={(event) => {
          remove(event);
         

        }}
          class="btn"
          style={{
            fontSize:"14px",
            float: "right",
            margin: "1px",
            "border-radius": "5px",
            color:"#474747",
            backgroundColor:"#BABABA"
          }}
        >
          delete
        </button></form>
     <br></br><br></br>

     <div>
      <h3 style={{color:"#656565"}}>CERTIFICATS</h3>
     
        {files.map((file, index) => {
          if (file.includes(","+demande.idsource+",")) {
            return (
              
           <span style={{backgroundColor:"#0568D3",padding:"5px",paddingLeft:"0px",borderRadius:"8px",color:"white",marginRight:"20px"}}>
<IoDocumentAttachOutline size={50} style={{backgroundColor:"#0568D3",padding:"5px",borderRadius:"10px"}}/>
<a style={{color:"white"}} href={'http://localhost:3002/Uploads/Profilesdocs/'+file} download>{file}</a> 

           </span>
               
             
            );
          }
          return null;
        })}
     
    </div>
<br></br>
</div>

       

</>
);





}else{return <></>}


}

export default Absenceitem;
