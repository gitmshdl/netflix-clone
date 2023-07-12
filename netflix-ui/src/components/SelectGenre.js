import React from "react";
import classes from "./SelectGenres.module.css";
import { useDispatch } from "react-redux";
import { fetchMoviesByGenre } from "../store";

export default function SelectGenre(props) {
  const dispatch = useDispatch();
  const type = props.type;
  return (
    <div className={classes.container}>
      <strong>Select Genre</strong>
      <select
        className={classes.flex}
        onChange={(e) => {
          dispatch(fetchMoviesByGenre({ genre: e.target.value, type }));
        }}
      >
        {props.genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
