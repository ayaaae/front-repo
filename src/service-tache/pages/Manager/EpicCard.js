import { Grid } from '@mui/material';
import React from 'react';
import { FaSquare } from "react-icons/fa";
import { FaCaretSquareDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import UpdateEpic from './UpdateEpic';


function EpicCard({ id, nom, des,color,backlog,idp,rd,r}) {
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
    <UpdateEpic 
    rd={rd}
    r={r}
    idp={idp}
    id_epic={id}
        nom_epic={nom}
        description={des}
        colore={color}/>  
    
    <div id={"epic"+id} style={{"background-color":"#F9F9F9","margin-bottom":"4px","margin-left":"4px","margin-right":"4px"  ,"border-radius":"7px","padding":"5px",border:"solid 1px #767676 "}}  >
<FaSquare color={color} />  <span style={{"font-size":"15px"}}><b>{nom}</b></span><FaCaretSquareDown size={21} onClick={(event) => {event.stopPropagation();
 HideShow({
   name: "UpdateEpic"+id });}} style={{color:"#8E8988","float":"right"}} />

 <div style={{margin:"3px"}}>{ ((backlog.filter(backlog => backlog.etat === "FAIT")).length||0) * 100 /(backlog.length||1)+"%"}</div>     
 
    </div>
   
    
    </>
  );
}

export default EpicCard;
