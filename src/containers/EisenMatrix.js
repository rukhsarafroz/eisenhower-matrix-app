import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoard from "../components/EisenBoard";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1
  }
}));

function EisenMatrix() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
        <EisenBoard />
    </main>
  );
}

export default EisenMatrix;