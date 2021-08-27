import { ADD_NEW_TASK, DELETE_TASK, DND_IN_DIFFERENT_SECTION, DND_IN_SAME_SECTION, EDIT_TASK, GET_TASK_LIST } from "../constants/ActionTypes";

export const getTaskList = () => async dispatch => {
    dispatch({ type: GET_TASK_LIST });
}

export const reorderTaskInSameSection = (sourceIndex, destinationIndex, sectionID, draggableId) => async dispatch => {
    dispatch({
    type : DND_IN_SAME_SECTION, providedData : {
        sourceIndex : sourceIndex,
        destinationIndex : destinationIndex,
        sectionID: sectionID,
        draggableId: draggableId
    }
    });
}

export const reorderTaskInDifferentSection = (sourceIndex, destinationIndex, sourceDroppableID, destinationDroppableID, draggableId ) => async dispatch  => {
    dispatch({
    type : DND_IN_DIFFERENT_SECTION, providedData : {
        sourceIndex : sourceIndex,
        destinationIndex : destinationIndex,
        sourceDroppableID : sourceDroppableID,
        destinationDroppableID : destinationDroppableID,
        draggableId : draggableId
    }
    })
}

export const addNewTask = (taskID, targetSection, task_name, description) => async dispatch => {
    dispatch({type : ADD_NEW_TASK, providedData : {
        taskID : taskID,
        targetSection : targetSection,
        task_name:task_name,
        description : description
    }
    })
}

export const editTask = (formValues) => async dispatch => {
    dispatch({type: EDIT_TASK, providedData: formValues });
}

export const  deleteTask = (id) => async dispatch => {
    dispatch(
        {
            type : DELETE_TASK,
            providedData: { id }
        }
    )
}