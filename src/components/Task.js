import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

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
    const { task, index } = props;
        return (
            <Draggable key={task.id} isDragDisabled={false} draggableId={task.id} index={index}>
                {
                    (provided, snapshot) => (
                        <Grid
                            item
                            className={classes.container}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            style={{backgroundColor: snapshot.isDragging? 'lightgreen' : 'white', ...provided.draggableProps.style}}
                        >
                            <div className={classes.content}>
                                {task.task_name}
                            </div>
                        </Grid>
                    )
                }
            </Draggable>
        );
    }

export default Task;