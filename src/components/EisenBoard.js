import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoardHeader from "./EisenBoardHeader";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, getTaskList, reorderTaskInDifferentSection, reorderTaskInSameSection } from "../actions/task";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import { useSnackbar } from "notistack";
import { CLEAR_REDUCER } from "../constants/ActionTypes";
import DroppableRow from "./DroppableRow";

const useStyles = makeStyles(theme => ({
    root: {
      padding: 20
    },
  }));

function EisenBoard (props) {
    const classes = useStyles();
    const [dialogueState,setDialogueState] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const formState = {
        task_name: null,
        description: null,
        urgent: false,
        important: false,
    }

    useEffect(() => {
        dispatch(getTaskList());
    }, [dispatch])

    const {
        tasklist,
        sections,
        addTaskSuccess,
        deleteTaskSuccess,
        editTaskSuccess,
        message
      } = useSelector(
        state => state.task
      );

    const urgentRow = [
        {
            title:"Urgent-Important",
            key:"UrgentImportant",
            taskMap: tasklist,
            section: sections?.UrgentImportant
        },
        {
            title:"Urgent-Not-Important",
            key:"UrgentNotImportant",
            taskMap: tasklist,
            section: sections?.UrgentNotImportant
        }
    ];
    const notUrgentRow = [
        {
            title:"Not-Urgent-Important",
            key:"NotUrgentImportant",
            taskMap: tasklist,
            section: sections?.NotUrgentImportant
        },
        {
            title:"Not-Urgent-Not-Important",
            key:"NotUrgentNotImportant",
            taskMap: tasklist,
            section: sections?.NotUrgentNotImportant
        }
    ];

    useEffect(() => {
        if(addTaskSuccess || editTaskSuccess || deleteTaskSuccess){
              enqueueSnackbar(message, { variant: "success" });
              dispatch({ type: CLEAR_REDUCER })
        }
    }, [addTaskSuccess, editTaskSuccess, deleteTaskSuccess])

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // if destination is not a droppable, do nothing
        if(!destination)return;

        if(destination==="Complete"){
            console.log("Complete");
        }

        // if element is dropped right back to its place, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {return;}

        // If draggable dropped in same droppable, but different position
        if(source.droppableId === destination.droppableId){
            dispatch(reorderTaskInSameSection(
                {
                    sourceIndex: source.index,
                    destinationIndex: destination.index,
                    sectionID: source.droppableId,
                    draggableId
                }
            ));
            return;
        }

        //If draggable dropped in another droppable
        dispatch(reorderTaskInDifferentSection(
            {
                sourceIndex: source.index,
                destinationIndex: destination.index,
                sourceDroppableID: source.droppableId,
                destinationDroppableID: destination.droppableId,
                draggableId
            }
        ));
        return;
    }

    const onSubmit = (formValues) => {
        console.log("formvalues",formValues);
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
            <EisenBoardHeader setDialogueState={setDialogueState}/>
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