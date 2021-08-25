import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1
  }
}));

function EisenMatrix() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
        eisen matrix container
    </main>
  );
}

export default EisenMatrix;