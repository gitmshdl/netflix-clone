import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import classes from "./Player.module.css";
import { useNavigate } from "react-router-dom";

export default function Player() {
  const navigate = useNavigate();

  return (
    <div className={classes.player}>
      <div className={classes.back}>
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      <video src={video} autoPlay loop controls muted></video>
    </div>
  );
}
