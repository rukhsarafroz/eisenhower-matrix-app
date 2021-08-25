import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoardHeader from "./EisenBoardHeader";
import Section from "./Section";

const useStyles = makeStyles(theme => ({
    root: {
      padding: 20
    },
    boards: {
        display: "flex",
        justifyContent: "center"
    }
  }));


function EisenBoard (props) {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.root}>
            <EisenBoardHeader />
            <Grid item xs={12} container direction="column">
                <Grid item spacing={2} container className={classes.boards}>
                    <Grid item><Section title="Urgent-Important"/></Grid>
                    <Grid item><Section title="Urgent-Not-Important"/></Grid>
                </Grid>
                <Grid item spacing={2} container className={classes.boards}>
                    <Grid item><Section title="Not-Urgent-Important"/></Grid>
                    <Grid item><Section title="Not-Urgent-Not-Important"/></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EisenBoard;