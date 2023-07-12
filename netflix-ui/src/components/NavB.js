import React from "react";
import { Nav, NavItem, NavLink, Navbar } from "reactstrap";
import { FaPowerOff } from "react-icons/fa";
import classes from "./NavB.module.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import logo from "../assets/logo.png";
import { onAuthStateChanged } from "firebase/auth";

export default function NavB(props) {
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  return (
    <div className={classes.flex}>
      <Navbar
        className={classes.nav}
        expand="md"
        fixed="top"
        color="transparent"
      >
        <div className={classes.brand}>
          <img src={logo} alt="Logo" />
        </div>
        <Nav className="flex-grow-1" justified navbar>
          <NavItem>
            <NavLink className="navlink" href="/" style={{ color: "white" }}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navlink" href="/tv" style={{ color: "white" }}>
              TV Shows
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="navlink"
              href="movies"
              style={{ color: "white" }}
            >
              Movies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="navlink"
              href="mylist"
              style={{ color: "white" }}
            >
              My List
            </NavLink>
          </NavItem>
          <Button
            onClick={() => signOut(firebaseAuth)}
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <FaPowerOff />
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
}
