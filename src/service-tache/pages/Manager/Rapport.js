import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Grid } from "@mui/material";
import Tablerapport from "./Tablerapport";
import Menu3 from "../../../Home/components/Menu3";
import Absenceotification from "../../../Home/components/Absenceotification";
import "./Manager.css";

function Rapport() {
  const [Demandes, setDemandes] = useState([]);
  const [projets, setProjets] = useState([]);
  const [projet, setProjet] = useState(null);
  const [idProjet, setIdProjet] = useState(4);
  const [reload, setReload] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [contrubution, setContrubution] = useState(0);
  const [wh, setWh] = useState(0);
  const [wv, setWv] = useState(0);
  const [absence, setAbsence] = useState(0);
  const [formula, setFormula] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/SERVICE-GESTIONPROJETS/projet/Getbyemployee/${JSON.parse(sessionStorage.getItem("UserInfo")).id}`,
          { method: "GET", mode: "cors" }
        );
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjets(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchDemandes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/Alldemande",
          { method: "GET", mode: "cors" }
        );
        if (!response.ok) throw new Error("Failed to fetch demandes");
        const data = await response.json();
        setDemandes(data);
      } catch (error) {
        console.error("Error fetching demandes:", error);
      }
    };

    fetchProjects();
    fetchDemandes();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  useEffect(() => {
    if (projets.length > 0) {
      setProjet(projets.find(p => p.id === idProjet));
    }
  }, [idProjet, projets]);

  const fetchFilteredDemandes = useCallback(async () => {
    if (startDate && endDate) {
      try {
        const response = await fetch(
          `http://localhost:8083/SERVICE-ABCENSE/demandeAbssence/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        if (response.ok) {
          const data = await response.json();
          setDemandes(data);
        } else {
          console.error("No requests found for the given date range.");
          setDemandes([]);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setDemandes([]);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchFilteredDemandes();
  }, [startDate, endDate, fetchFilteredDemandes]);

  const handleProjetSelectChange = useCallback((event) => {
    setIdProjet(Number(event.target.value));
  }, []);

  const handleReset = () => {
    setFormula([]);
  };

  const handleFilter = () => {
    const totalPercentage = Number(wh) + Number(wv) + Number(absence) + Number(contrubution);
    if (totalPercentage > 100 || totalPercentage <= 0) {
      alert("Your percentage exceed 100% or is zero!");
    } else {
      setFormula([Number(wh), Number(wv), Number(absence), Number(contrubution)]);
    }
  };

  const demandesMemo = useMemo(() => Demandes, [Demandes]);
  const projetsMemo = useMemo(() => projets, [projets]);
  const projetMemo = useMemo(() => projet, [projet]);

  return (
    <div>
      <Menu3 rd={setReload} r={reload} />
      <Absenceotification rd={setReload} r={reload} />
      <Grid
        container
        spacing={2}
        style={{
          marginLeft: "0px",
          marginTop: "20px",
          borderLeft: "solid black 1px",
          padding: "1px",
          backgroundColor: "rgba(217, 217, 214, 0.5)",
          height: "100%",
        }}
      >
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: "#4528A7",
              color: "white",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <b style={{ margin: "5px", color: "white" }}>PROJECT : </b>
            <select
              value={idProjet}
              onChange={handleProjetSelectChange}
              style={{
                backgroundColor: "white",
                border: "#6B2FFF solid 1px",
                borderRadius: "7px",
                fontWeight: "bold",
                height: "auto",
                width: "160px",
                textAlign: "center",
              }}
              className="form-control"
            >
              {projetsMemo.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Grid
          item
          style={{
            height: "100%",
            overflow: "auto",
            minWidth: "700px",
            borderRadius: "7px",
            padding: "10px",
            margin: "4px",
          }}
          xs={12}
        >
          <b
            style={{
              backgroundColor: "white",
              padding: "10px",
              fontSize: "20px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              color: "#0062CA",
            }}
          >
            RAPPORTS
          </b>

          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
            <div style={{ height: "100%", overflow: "auto" }}>
              <br />
              <button
                className="btn"
                style={{
                  float: "right",
                  color: "white",
                  backgroundColor: "#FF7000",
                  marginRight: "5px",
                }}
                onClick={handleReset}
              >
                Reset Filter
              </button>
              <span style={{ fontSize: "15px", color: "white", backgroundColor: "#0062CA", borderRadius: "8px", padding: "8px", marginRight: "4px" }}>
                <b>Filter Formula : </b>
              </span>
              <input
                value={contrubution || ""}
                onChange={(event) => setContrubution(event.target.value)}
                type="number"
                placeholder="Contrubution %"
                style={{ border: "solid 3px #0062CA", borderRadius: "8px", marginRight: "4px" }}
              />
              <input
                value={wh || ""}
                onChange={(event) => setWh(event.target.value)}
                type="number"
                placeholder="Worcking Hours %"
                style={{ border: "solid 3px #0062CA", borderRadius: "8px", marginRight: "4px" }}
              />
              <input
                value={wv || ""}
                onChange={(event) => setWv(event.target.value)}
                type="number"
                placeholder="Work Value %"
                style={{ border: "solid 3px #0062CA", borderRadius: "8px", marginRight: "4px" }}
              />
              <input
                value={absence || ""}
                onChange={(event) => setAbsence(event.target.value)}
                type="number"
                placeholder="Absence %"
                style={{ border: "solid 3px #0062CA", borderRadius: "8px", marginRight: "4px" }}
              />

              <button
                className="btn"
                style={{
                  color: "white",
                  backgroundColor: "#0062CA",
                  marginRight: "5px",
                }}
                onClick={handleFilter}
              >
                Filter
              </button>

              <div
                style={{
                  border: "solid #6F6F6F 1px",
                  width: "100%",
                  marginTop: "32px",
                  minWidth: "1000px",
                  marginBottom: "5px",
                }}
              />
              <div style={{ width: "100%", minWidth: "1000px" }} />
              <div style={{ height: "80vh", overflow: "auto" }}>
                {projetMemo && (
                  <Tablerapport r={reload} rd={setReload} demandes={demandesMemo} projets={projetMemo} formul={formula} />
                )}
              </div>
            </div>
          </div>
        </Grid>
        <br />
      </Grid>
    </div>
  );
}

export default Rapport;
