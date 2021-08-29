import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoard from "../components/EisenBoard";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList, reorderTaskInDifferentSection, reorderTaskInSameSection } from "../actions/task";
import { useSnackbar } from "notistack";
import { CLEAR_REDUCER } from "../constants/ActionTypes";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
  }
}));

function EisenMatrix() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(getTaskList());
    }, [])

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
          title: "Urgent-Important",
          key: "UrgentImportant",
          taskMap: tasklist,
          section: sections?.UrgentImportant
      },
      {
          title: "Urgent-Not-Important",
          key: "UrgentNotImportant",
          taskMap: tasklist,
          section: sections?.UrgentNotImportant
      }
    ];

    const notUrgentRow = [
        {
            title: "Not-Urgent-Important",
            key: "NotUrgentImportant",
            taskMap: tasklist,
            section: sections?.NotUrgentImportant
        },
        {
            title: "Not-Urgent-Not-Important",
            key: "NotUrgentNotImportant",
            taskMap: tasklist,
            section: sections?.NotUrgentNotImportant
        }
    ];

    useEffect(() => {
        if(addTaskSuccess || editTaskSuccess || deleteTaskSuccess){
              enqueueSnackbar(message, { variant: "success" });
              dispatch({ type: CLEAR_REDUCER })
        }
    }, [addTaskSuccess, editTaskSuccess, deleteTaskSuccess, dispatch, enqueueSnackbar, message])

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

  return (
    <main className={classes.content}>
        <EisenBoard
          urgentRow={urgentRow}
          notUrgentRow={notUrgentRow}
          onDragEnd={onDragEnd}
        />
    </main>
  );
}

export default EisenMatrix;
