import React, { useState } from "react";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";

export default React.memo(function Card(props) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:4000/api/user/add", {
        email,
        data: props.movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromList = () => {
    dispatch(removeMovieFromLiked({ movieId: props.movieData.id, email }));
  };

  return (
    <div
      className={classes.content}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${props.movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className={classes.hover}>
          <div className={classes.image}>
            <img
              src={`https://image.tmdb.org/t/p/w500${props.movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay
              muted
              loop
              onClick={() => navigate("/player")}
            />
          </div>
          <div className={classes.infoc}>
            <h3 className={classes.name} onClick={() => navigate("/player")}>
              {props.movieData.name}
            </h3>
            <div className={classes.icons}>
              <div className={classes.controls}>
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {props.isLiked ? (
                  <BsCheck title="Remove From List" onClick={removeFromList} />
                ) : (
                  <AiOutlinePlus title="Add to My List" onClick={addToList} />
                )}
              </div>
              <div className={classes.info}>
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className={classes.genres}>
              <ul className={classes.flex}>
                {props.movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
