import { GET_TASK_LIST } from "../constants/ActionTypes";
import initialData from "../mockData/initialData";

const initialState = {
    ...initialData,
};


const task = (state = initialState, action) => {
    switch(action.type){
        case GET_TASK_LIST:
            return state;
        default:
            return state;
    }
};

export default task;