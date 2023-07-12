import React, { useEffect } from "react";
import classes from "./Netflix.module.css";
import NavB from "../components/NavB";
import backgroundImage from "../assets/home.jpg";
import logo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from "../store/index";
import Slider from "../components/Slider";

export default function Netflix() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded, genres, dispatch]);

  // window.onscroll = () => {
  //   setIsScrolled(window.scrollY === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  return (
    <div className={classes.black}>
      <NavB />
      <div className={classes.hero}>
        <img
          src={backgroundImage}
          alt="background"
          className={classes.background}
        />
      </div>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.buttons}>
          <button onClick={() => navigate("/player")}>
            <FaPlay />
            Play
          </button>
          <button>
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
      <Slider movies={movies} />
    </div>
  );
}
