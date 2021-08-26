import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
    container: {
        border: "1px solid lightgrey",
        borderRadius: "2px",
        backgroundColor: "white",
        minWidth: "300px",
        margin: "20px",
        padding: "20px"
    },
    title: {
        display: "flex",
        justifyContent: "center",
        margin : "auto",
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "14px"
    },
    tasklist: {
        padding: "8px",
        transition: "background-color 0.2s ease",
        flexGrow: "1",
        minHeight: "100px",
        overflow: "auto"
    },
  }));


function Section (props) {
    const classes = useStyles();
    const { title, section, tasks } = props;
        return (
            <Grid container direction="column" className={classes.container} >
                <Grid item xs={12} className={classes.title}>
                   {title}
                </Grid>
                <Droppable droppableId={section.id} type="task">
                    {(provided, snapshot) => (
                        <Grid
                            item
                            container
                            direction="column"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classes.tasklist}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'lightgrey' : 'inherit'}}
                        >
                            {
                                tasks && tasks.map((task,index) => {
                                    return <Task key={task.id} task={task} index={index} />
                                })
                            }
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </Grid>
        );
    }

export default Section;