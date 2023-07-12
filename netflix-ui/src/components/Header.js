import React from "react";
import logo from "../assets/logo.png";
import classes from "./Header.module.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <Button
        color="danger"
        onClick={() => navigate(props.login ? "/login" : "/signup")}
      >
        {props.login ? "Log In" : "Sign Up"}
      </Button>
    </div>
  );
}
