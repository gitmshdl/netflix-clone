import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import classes from "./Login.module.css";
import { Button } from "reactstrap";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div className={classes.container}>
      <BackgroundImage />
      <div className={classes.content}>
        <Header />
        <div className={classes["form-container"]}>
          <div className={classes.form}>
            <div className={classes.title}>
              <h3>Login</h3>
            </div>
            <form onSubmit={handleLogIn} className={classes.fcontainer}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button className={classes.start} color="danger">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
