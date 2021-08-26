import { GET_TASK_LIST } from "../constants/ActionTypes";

export const getTaskList = () => async dispatch => {
    dispatch({ type: GET_TASK_LIST });
}