import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoardHeader from "./EisenBoardHeader";
import TaskForm from "./TaskForm";
import { useDispatch } from "react-redux";
import { addNewTask } from "../actions/task";
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import DroppableRow from "./DroppableRow";

const useStyles = makeStyles(theme => ({
    root: {
      padding: 20
    },
  }));

function EisenBoard (props) {
    const { urgentRow, notUrgentRow, onDragEnd } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [dialogueState,setDialogueState] = useState(false);

    const formState = {
        task_name: null,
        description: null,
        urgent: false,
        important: false,
    }

    const onSubmit = (formValues) => {
        const urgent = formValues.urgent;
        const important = formValues.important;

        //Determine which section to put the task in
        let targetSection = "";
        if (!urgent){
            targetSection += "Not";
        }
        targetSection += "Urgent";
        if (!important){
            targetSection += "Not";
        }
        targetSection += "Important";
        const taskID = 'task-'+ uuid();

        dispatch(addNewTask(
            {
                taskID,
                targetSection,
                task_name: formValues.task_name,
                description: formValues.description
            }
        ));
    }
    return (
        <Grid container direction="column" className={classes.root}>
            <EisenBoardHeader setDialogueState={setDialogueState} />
            <Grid item xs={12} container direction="column">
            <DragDropContext onDragEnd={onDragEnd} >
                <DroppableRow droppableId="Urgent" row={urgentRow} />
                <DroppableRow droppableId="NotUrgent" row={notUrgentRow} />
            </DragDropContext>
            </Grid>
            {dialogueState && <TaskForm viewModeType={1} dialogueState={dialogueState} setDialogueState={setDialogueState} formValues={formState} onSubmit={onSubmit}/>}
        </Grid>
    );
}

export default EisenBoard;