import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SectionList from "./SectionList";
import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
    boards: {
        display: "flex",
        justifyContent: "center"
    }
  }));

function DroppableRow (props) {
    const { row, droppableId} = props;
    const classes = useStyles();
    return (
        <Droppable droppableId={droppableId} direction="horizontal" type="column">
            {
                (provided) => {
                    return (
                        <Grid item spacing={2} container className={classes.boards} {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                row.map((section,index) => {
                                    return(
                                    <Grid item key={`${droppableId}-${index}`}>
                                        <SectionList
                                            {...section}
                                            index={index}
                                        />
                                    </Grid>
                                    )
                                })
                            }
                            {provided.placeholder}
                        </Grid>
                    )
                }
            }
        </Droppable>
    );
}

export default DroppableRow;