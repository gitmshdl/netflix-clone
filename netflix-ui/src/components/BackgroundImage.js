import React from "react";
import background from "../assets/login.jpg";
import classes from "./BackgroundImage.module.css";

export default function BackgroundImage() {
  return (
    <div className={classes.container}>
      <img src={background} alt="background" />
    </div>
  );
}
