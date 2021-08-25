import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoardHeader from "./EisenBoardHeader";
import Section from "./Section";
import TaskForm from "./TaskForm";

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
    const [dialogueState,setDialogueState] = useState(false);
    const formState = {
        task_name: null,
        description: null,
        urgent: false,
        important: false,
    }
    return (
        <Grid container direction="column" className={classes.root}>
            <EisenBoardHeader setDialogueState={setDialogueState}/>
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
            {dialogueState && <TaskForm viewModeType={1} dialogueState={dialogueState} setDialogueState={setDialogueState} formValues={formState}/>}
        </Grid>
    );
}

export default EisenBoard;