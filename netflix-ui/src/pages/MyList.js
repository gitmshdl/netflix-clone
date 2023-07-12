import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import classes from "./MyList.module.css";
import NavB from "../components/NavB";
import Card from "../components/Card";

export default function Movies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) dispatch(getUserLikedMovies(email));
  }, [email, dispatch]);

  return (
    <div className={classes.container}>
      <NavB />
      <div className={classes.content}>
        <h1>My List</h1>
        <div className={classes.grid}>
          {movies.map((movie, index) => (
            <Card
              movieData={movie}
              index={index}
              key={movie.id}
              isLiked={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
