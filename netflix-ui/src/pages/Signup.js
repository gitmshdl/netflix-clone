import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import classes from "./Signup.module.css";
import { Button } from "reactstrap";
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [showPassword, setShowPassword] = useState();

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      alert("Enter a valid email and the password must be longer than 5");
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div className={classes.container}>
      <BackgroundImage />
      <div className={classes.content}>
        <Header login />
        <div className={classes.body}>
          <div className={classes.text}>
            <h1>Unlimited movies, TV shows, and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <div className={classes.form}>
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
            <Button color="danger" onClick={handleSignIn}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
