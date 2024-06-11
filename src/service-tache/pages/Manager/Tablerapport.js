import React, { useState, useEffect, useMemo } from "react";
import Absenceitem from "./Absenceitem";

// Sample data
const Tablerapport = ({ r, rd, demandes, projets, formul }) => {
  const [Backlogs, setBacklogs] = useState([]);
  const [Employees, setEmployees] = useState([]);

  // Fetch backlogs from API
  const fetchBacklogsFromApi = async () => {
    try {
      const response = await fetch(`http://localhost:8083/SERVICE-TACHE/backlog/findProjectBacklogs/${projets.id}`);
      if (!response.ok) throw new Error("Failed to fetch backlogs");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching backlogs data:", error);
    }
  };

  useEffect(() => {
    if (Backlogs.length === 0) {
      fetchBacklogsFromApi().then(setBacklogs).catch(console.error);
    }
  }, [Backlogs]);

  const sumMetrics = useMemo(() => {
    let sumTache = 0;
    let sumPriority = 0;
    let sumTacheTime = 0;

    Backlogs.forEach((b) => {
      if(b.etat=="FAIT"){
        sumPriority += b.prioriter;
      }
  
      b.taches.forEach((t) => {
        if(t.etat_tache=="FAIT"){
          sumTache += 1;
        sumTacheTime += t.duree;
        }
        
      });
    });

    return { sumTache, sumPriority, sumTacheTime };
  }, [Backlogs]);

  const calculateMetrics = (ide, metricType) => {
    let count = 0;
    Backlogs.forEach((b) => {
      b.taches.forEach((t) => {
        if (t.idemployee === ide) {
          if(t.etat_tache=="FAIT"){
          if (metricType === "tache") count += 1;
          if (metricType === "duree") count += t.duree;
        }
      }
      });
    });

    if (metricType === "priority") {
      Backlogs.forEach((b) => {
        if(b.etat=="FAIT"){
        if (b.id_employee === ide) count += b.prioriter;
      }
      });
    }

    if (metricType === "absence") {
      demandes.forEach((d) => {
        if (d.idsource === ide) {
          const differenceInTime = new Date(d.datefin).getTime() - new Date(d.datedebut).getTime();
          const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
          count += differenceInDays;
        }
      });
    }

    return count;
  };

  useEffect(() => {
    if (projets.empployees) {
      const employees = [...projets.empployees];
      const { sumTache, sumPriority, sumTacheTime } = sumMetrics;
      const totalFormula = formul.reduce((a, b) => a + b, 0);

      employees.sort((a, b) => {
        const aValue = (calculateMetrics(a.id, "duree") / sumTacheTime) * formul[0] +
          (calculateMetrics(a.id, "priority") / sumPriority) * formul[1] +
          (calculateMetrics(a.id, "tache") / sumTache) * formul[3] -
          calculateMetrics(a.id, "absence") * formul[2];

        const bValue = (calculateMetrics(b.id, "duree") / sumTacheTime) * formul[0] +
          (calculateMetrics(b.id, "priority") / sumPriority) * formul[1] +
          (calculateMetrics(b.id, "tache") / sumTache) * formul[3] -
          calculateMetrics(b.id, "absence") * formul[2];

        return (bValue / totalFormula) - (aValue / totalFormula);
      });

      setEmployees(employees);
    }
  }, [formul, projets.empployees, sumMetrics]);

  if (!projets.empployees) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#0062CA" }}>Rapport</h2>
      <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>WORKING HOURS</th>
              <th style={styles.th}>NUMBER OF TASKS</th>
              <th style={styles.th}>TASKS PRIORITY</th>
              <th style={styles.th}>ABSENCE</th>
              <th style={styles.th} title="Tasks/Project Tasks">CONTRIBUTION SCORE</th>
              <th style={styles.th} title="Priorities/Project Priorities">WORK VALUE SCORE</th>
              <th style={styles.th} title="Tasks Spent Hours/Project Tasks Hours">WORKING HOURS SCORE</th>
            </tr>
          </thead>
          <tbody>
            {Employees.map((row, index) => (
              <tr key={index}>
                <td style={styles.td}>{`${row.nom} ${row.prenom}`}</td>
                <td style={styles.td}>{calculateMetrics(row.id, "duree")}</td>
                <td style={styles.td}>{calculateMetrics(row.id, "tache")}</td>
                <td style={styles.td}>{calculateMetrics(row.id, "priority")}</td>
                <td style={styles.td}>{calculateMetrics(row.id, "absence")}</td>
                <td style={styles.td}>{(calculateMetrics(row.id, "tache") / sumMetrics.sumTache).toFixed(2)}</td>
                <td style={styles.td}>{(calculateMetrics(row.id, "priority") / sumMetrics.sumPriority).toFixed(2)}</td>
                <td style={styles.td}>{(calculateMetrics(row.id, "duree") / sumMetrics.sumTacheTime).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div>
          <Absenceitem r={r} rd={rd} demande={null} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  table: {
    borderCollapse: "collapse",
    margin: "20px 0",
  },
  th: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#0062CA",
    color: "white",
  },
  td: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
};

export default Tablerapport;
