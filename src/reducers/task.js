import { cloneDeep } from "lodash";
import { DND_IN_DIFFERENT_SECTION, DND_IN_SAME_SECTION, GET_TASK_LIST } from "../constants/ActionTypes";
import initialData from "../mockData/initialData";

const initialState = {
    ...initialData,
};


const task = (state = initialState, action) => {
    switch(action.type){
        case GET_TASK_LIST:
            return state;
        case DND_IN_SAME_SECTION:
            {
                const providedData = action.providedData;

                //Make a copy of all the 4 columns' content
                let sections = cloneDeep(state.sections);
                const newTasksList = Array.from(sections[providedData.sectionID].taskIds);

                //reorder tasks in the list
                newTasksList.splice(providedData.sourceIndex, 1);
                newTasksList.splice(providedData.destinationIndex, 0, providedData.draggableId);

                //reassign new lists to state
                sections[providedData.sectionID].taskIds = newTasksList;
                return {
                    ...state,
                    sections : sections
                }
            }
        case DND_IN_DIFFERENT_SECTION:
            {
                const providedData = action.providedData;

                //Make a copy of all the content
                let sections = cloneDeep(state.sections);
                let taskListOfSourceDroppable = Array.from(sections[providedData.sourceDroppableID].taskIds);
                let taskListOfDestinationDroppable = Array.from(sections[providedData.destinationDroppableID].taskIds);

                //remove task from source list, and add to destination list
                taskListOfSourceDroppable.splice(providedData.sourceIndex,1);
                taskListOfDestinationDroppable.splice(providedData.destinationIndex,0, providedData.draggableId);

                //reassign new lists to state
                sections[providedData.sourceDroppableID].taskIds = taskListOfSourceDroppable;
                sections[providedData.destinationDroppableID].taskIds = taskListOfDestinationDroppable;

                return {
                    ...state,
                    sections : sections
                }
        }
        default:
            return state;
    }
};

export default task;