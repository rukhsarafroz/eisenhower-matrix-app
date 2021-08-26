import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

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
        fontSize: "14px"
    }
  }));


function Task (props) {
    const classes = useStyles();
    const { isDragging, task } = props;
        return (
            <Grid item className={classes.container} style={{backgroundColor: isDragging? 'lightgreen' : 'white'}}>
                <div className={classes.content}>
                    {task.task_name}
                </div>
            </Grid>
        );
    }

export default Task;