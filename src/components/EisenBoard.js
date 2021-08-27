import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoardHeader from "./EisenBoardHeader";
import Section from "./Section";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, getTaskList, reorderTaskInDifferentSection, reorderTaskInSameSection } from "../actions/task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles(theme => ({
    root: {
      padding: 20
    },
    boards: {
        display: "flex",
        justifyContent: "center"
    }
  }));

  const Sections = props => {
    const { section, taskMap, index, title } = props;
		const tasks = section && taskMap && section.taskIds.map(
			taskId => taskMap[taskId]
		);
    return (
        <Section title={title} section={section} tasks={tasks} index={index} />
    )
  }

function EisenBoard (props) {
    const classes = useStyles();
    const [dialogueState,setDialogueState] = useState(false);
    const dispatch = useDispatch();
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
        sections
      } = useSelector(
        state => state.task
      );

    useEffect(() => {
        console.log("tasklist",tasklist,"sections",sections);
    }, [tasklist,sections])

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
            dispatch(reorderTaskInSameSection(source.index,
                destination.index,
                source.droppableId,
                draggableId
            ));
            return;
        }

        //If draggable dropped in another droppable
        dispatch(reorderTaskInDifferentSection(
            source.index,
            destination.index,
            source.droppableId,
            destination.droppableId,
            draggableId
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

        dispatch(addNewTask(taskID, targetSection, formValues.task_name, formValues.description));
    }

    return (
        <Grid container direction="column" className={classes.root}>
            <EisenBoardHeader setDialogueState={setDialogueState}/>
            <Grid item xs={12} container direction="column">
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="Urgent" direction="horizontal" type="column">
                        {
                            (provided) => {
                                return (
                                    <Grid item spacing={2} container className={classes.boards} {...provided.droppableProps} ref={provided.innerRef}>
                                        <Grid item>
                                            <Sections
                                                title="Urgent-Important"
                                                key="UrgentImportant"
                                                taskMap={tasklist}
                                                section={sections?.UrgentImportant}
                                                index={0}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Sections
                                                title="Urgent-Not-Important"
                                                key="UrgentImportant"
                                                taskMap={tasklist}
                                                section={sections?.UrgentNotImportant}
                                                index={1}
                                            />
                                        </Grid>
                                        {provided.placeholder}
                                    </Grid>
                                )
                            }
                        }
                    </Droppable>
                    <Droppable droppableId="Urgent" direction="horizontal" type="column">
                        {
                            (provided) => {
                                return (
                                    <Grid item spacing={2} container className={classes.boards} {...provided.droppableProps} ref={provided.innerRef}>
                                        <Grid item>
                                            <Sections
                                                title="Not-Urgent-Important"
                                                key="NotUrgentImportant"
                                                taskMap={tasklist}
                                                section={sections?.NotUrgentImportant}
                                                index={0}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Sections
                                                title="Not-Urgent-Not-Important"
                                                key="NotUrgentNotImportant"
                                                taskMap={tasklist}
                                                section={sections?.NotUrgentNotImportant}
                                                index={1}
                                            />
                                        </Grid>
                                        {provided.placeholder}
                                    </Grid>
                                )
                            }
                        }
                    </Droppable>
            </DragDropContext>
            </Grid>
            {dialogueState && <TaskForm viewModeType={1} dialogueState={dialogueState} setDialogueState={setDialogueState} formValues={formState} onSubmit={onSubmit}/>}
        </Grid>
    );
}

export default EisenBoard;