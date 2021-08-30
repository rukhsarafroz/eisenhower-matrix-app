import { ADD_NEW_TASK, DELETE_TASK, DND_IN_DIFFERENT_SECTION, DND_IN_SAME_SECTION, EDIT_TASK, GET_TASK_LIST } from "../constants/ActionTypes";

export const getTaskList = () => async dispatch => {
    dispatch({ type: GET_TASK_LIST });
}

export const reorderTaskInSameSection = (requestParameter) => async dispatch => {
    dispatch({
    type : DND_IN_SAME_SECTION, providedData : requestParameter
    });
}

export const reorderTaskInDifferentSection = ( requestParameter ) => async dispatch  => {
    dispatch({
    type : DND_IN_DIFFERENT_SECTION, providedData : requestParameter
    })
}

export const addNewTask = (requestParameter) => async dispatch => {
    dispatch({type : ADD_NEW_TASK, providedData : requestParameter
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