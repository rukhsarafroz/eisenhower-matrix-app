import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Task from "./Task";

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
    const { title, isDraggingOver, isDragging, tasks } = props;
        return (
            <Grid container direction="column" className={classes.container} >
                <Grid item xs={12} className={classes.title}>
                   {title}
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    className={classes.tasklist}
                    style={{ backgroundColor: isDraggingOver ? 'lightgrey' : 'inherit'}}
                >
                    {
                        tasks && tasks.map(task => {
                            return <Task key={task.id} task={task} isDragging={isDragging} />
                        })
                    }
                </Grid>
            </Grid>
        );
    }

export default Section;