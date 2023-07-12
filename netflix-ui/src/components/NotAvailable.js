import React from "react";
import classes from "./NotAvailable.module.css";

export default function NotAvailable() {
  return (
    <h1 className={classes.notAvailable}>
      No Movies available for selected genre
    </h1>
  );
}
