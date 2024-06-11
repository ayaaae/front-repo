import React from "react";
import { useState,useEffect } from "react";
import Absenceitem from "./Absenceitem";
import { Link } from 'react-router-dom';
// Sample data

const Tablenotif = ({ r, rd, demandes }) => {
  const [demande, setdemabe] = useState(null);
  const [cr, setcr] = useState("grey");
  
  //modify coior :

  return (
    <div>
      <h2 style={{color:"#656565"}}>Employee Absence Requests Table</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Full Name</th>
            <th style={styles.th}>Start Date</th>
            <th style={styles.th}>End Date</th>
            <th style={styles.th}>Days</th>
            <th style={styles.th}>Motif</th>
            <th style={styles.th}>STATE</th>
            <th style={styles.th}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((row, index) => {
            const differenceInTime =
              new Date(row.datefin).getTime() -
              new Date(row.datedebut).getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
            function midfycolor() {
              if (row.etat == "APPROVED") {
                return "green";
              }
              if (row.etat == "UNREAD") {
                return "orange";
              }
              if (row.etat == "REJECTED") {
                return "grey";
              }
            }
            if(JSON.parse(sessionStorage.getItem("UserInfo")).id==row.iddestination){

                return (
                    <tr key={index}>
                      <td style={styles.td}> <Link to={`/historique-absence/${row.idsource}`}>{row.nomcompletsource}</Link>
</td>
                      <td style={styles.td}>{row.datedebut}</td>
                      <td style={styles.td}>{row.datefin}</td>
                      <td style={styles.td}>{differenceInDays}</td>
                      <td style={styles.td}>{row.motif}</td>
                      <td style={styles.td}>
                        <input
                          readOnly
                          style={{
                            color: "white",
                            backgroundColor: midfycolor(),
                            border: "#767676 solid 1px",
      
                            "border-radius": "6px",
                            textAlign: "center",
      
                            padding: "1px",
      
                            borderTop: "none",
                          }}
                          value={row.etat}
                          className="form-control"
                        />
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={(event) => {
                            setdemabe(row);
                          }}
                          class="btn"
                          style={{
                            fontSize: "14px",
                            width: "100%",
                            margin: "1px",
                            "border-radius": "5px",
                            color: "white",
                            backgroundColor: "#0568D3",
                          }}
                        >
                          check
                        </button>
                      </td>
                    </tr>
                  );

            }
           
          })}
        </tbody>
      </table>
      <br></br>
      <div>
        <Absenceitem r={r} rd={rd} demande={demande} />
        
      </div>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  },
  th: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
};

export default Tablenotif;
