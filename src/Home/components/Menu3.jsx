import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarEmp from "../../../src/service-utilisateurs/employee/components/sidebarEmp";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, IconButton, Box, Badge } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function Menu3({ r, rd }) {
  function logot() {
    sessionStorage.clear();
  }
  const [count, setcount] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setnotifications] = useState([]);
  // const [r,rd]=useState(0);

  useEffect(() => {
    fetchDataFromApi()
      .then((data) => {
        setnotifications(data);

        setcount(data.filter((notif) => notif.openat == null).length);
      })
      .catch((error) => {
        console.error("Error fetching Demandes data:", error);
      });
  }, [r]);

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/SERVICE-ABCENSE/notifications/AllNotifications",
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
  const toggleSidebar = () => {
    console.log("sidebarOpen avant le changement :", sidebarOpen);
    setSidebarOpen(!sidebarOpen);
    console.log("sidebarOpen après le changement :", !sidebarOpen);
  };
  function HideShow(divtohide) {
    var x = document.getElementById(divtohide.name);
    //update unopenitems items to read

   
      const promises = notifications.map(async (item) => {
        if (item.openat === null) {
          const formnotifData = { ...item, openat: new Date() };
    
          try {
            const response = await fetch(
              "http://localhost:8083/SERVICE-ABCENSE/notifications/update/" + item.id,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formnotifData),
              }
            );
    
            
            const data = await response.json();
          } catch (error) {
            console.log(JSON.stringify(formnotifData));
            console.error("Error updating notification:", error);
          }
        }
      });
    
      
    rd(r + 1);

    if (x) {
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    }
  }
  return (
    <>
      <Box display="flex">
        <nav className="navbar navbar-expand-md fixed-top" id="navbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>

          <div className="container-fluid px-0">
            <a href="/">
              <img
                className="navbar-brand w-75 d-md-none"
                src="/assets/img/logos/logo.svg"
                alt="logo"
              />
            </a>
            <a className="navbar-brand fw-bold d-none d-md-block" href="/">
              DXC Technology
            </a>

            <div
              className="collapse navbar-collapse justify-content-md-end"
              id="navbar-content"
              data-navbar-collapse="data-navbar-collapse"
            ></div>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                HideShow({ name: "abssencenotif" });
              }}
            >
              <Badge
                color="#ff0000"
                badgeContent={count > 9 ? "+9" : count}
                sx={{ color: "white", mr: 2 }}
              >
                <NotificationsNoneIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>

            <Link to="/profile">
              <img
                className="rounded-circle "
                width="50px"
                height="50px"
                src={
                  "http://localhost:3001/Uploads/ProfilesImages/" +
                  JSON.parse(sessionStorage.getItem("UserInfo")).nom +
                  JSON.parse(sessionStorage.getItem("UserInfo")).prenom +
                  JSON.parse(sessionStorage.getItem("UserInfo")).id +
                  ".jpg"
                }
                style={{ border: "white solid 1px" }}
              />{" "}
            </Link>
            <Link to="/login">
              <Button
                className="btn btn-warning"
                style={{ color: "white" }}
                onClick={() => {
                  logot();
                }}
              >
                Logout
              </Button>
            </Link>
          </div>
        </nav>
      </Box>
      <SidebarEmp openSidebar={sidebarOpen} />
    </>
  );
}

export default Menu3;
