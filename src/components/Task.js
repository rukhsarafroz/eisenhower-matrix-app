import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../actions/task";
import MoreHorizMenu from "./MoreHorizMenu";
import TaskForm from "./TaskForm";

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: "8px",
        borderRadius : "2px",
        border: "1px solid lightgrey",
        padding: "8px",
        overflow: "auto",
        textAlign: "center",
        position: "inline"
    },
    content: {
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: "auto"
    },
    buttonGrid: {
        display: "flex",
        justifyContent: "flex-end",
    }
  }));


function Task (props) {
    const classes = useStyles();
    const { task, index } = props;
    const dispatch = useDispatch();
    const [currentTask, setCurrentTask] = useState(task);
    const [dialogueState, setDialogueState] = useState(false);

    const handleSubmitEditedTask = (formValues) => {
        dispatch(editTask(formValues));
    }

    useEffect(() => {
        setCurrentTask(task);
    }, [task])

    const handleDiagloue = () => {
        setDialogueState(true);
    }

    const handleDeleteTask = (event) => {
        event.preventDefault();
        dispatch(deleteTask(currentTask.id));
    }

    const menuList = [
        { name: "Edit Task", actionHandler: handleDiagloue },
        { name: "Delete Task", actionHandler: handleDeleteTask },
      ]
        return (
            <Fragment>
                <Draggable key={task.id} isDragDisabled={false} draggableId={task.id} index={index}>
                    {
                        (provided, snapshot) => (
                            <Grid
                                item
                                container
                                className={classes.container}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                style={{backgroundColor: snapshot.isDragging? 'lightgreen' : 'white', ...provided.draggableProps.style}}
                            >
                                <Grid item xs className={classes.content}>
                                    {currentTask.task_name}
                                </Grid>
                                <Grid item xs={1} container className={classes.buttonGrid}>
                                <MoreHorizMenu menuList={menuList} />
                                </Grid>
                            </Grid>
                        )
                    }
                </Draggable>
                {dialogueState && <TaskForm viewModeType={2} dialogueState={dialogueState} setDialogueState={setDialogueState} formValues={currentTask} onSubmit={handleSubmitEditedTask}/>}
            </Fragment>
        );
    }

export default Task;