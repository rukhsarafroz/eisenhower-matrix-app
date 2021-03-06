import { cloneDeep } from "lodash";
import { ADD_NEW_TASK, CLEAR_REDUCER, DELETE_TASK, DND_IN_DIFFERENT_SECTION, DND_IN_SAME_SECTION, EDIT_TASK, GET_TASK_LIST } from "../constants/ActionTypes";
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
        case ADD_NEW_TASK:
            {
                //Make a copy of the tasklist and add new task to it
                let tasklist = cloneDeep(state.tasklist);
                tasklist[action.providedData.taskID] = { id: action.providedData.taskID, task_name: action.providedData.task_name, description: action.providedData.description};

                //Replace the current tasklist in the state with new one
                let sections = cloneDeep(state.sections);
                sections[action.providedData.targetSection].taskIds.push(action.providedData.taskID);

                return {
                    ...state,
                    tasklist: tasklist,
                    sections : sections,
                    addTaskSuccess: true,
                    message: "Task Added Successfully"
                }
            }
        case EDIT_TASK:
            {
                let newTaskList = cloneDeep(state.tasklist);
                newTaskList[action.providedData.id] = action.providedData;

                return {
                    ...state,
                    tasklist: newTaskList,
                    editTaskSuccess: true,
                    message: "Task Edited Successfully"
                };
            }
        case DELETE_TASK:
            {
                const id = action.providedData.id;
                let newTaskList = cloneDeep(state.tasklist);
                delete newTaskList[id];

                let newSections = cloneDeep(state.sections);
                newSections.NotUrgentImportant.taskIds = newSections.NotUrgentImportant.taskIds.filter(value => value !== id);
                newSections.UrgentImportant.taskIds = newSections.UrgentImportant.taskIds.filter(value => value !== id);
                newSections.NotUrgentNotImportant.taskIds = newSections.NotUrgentNotImportant.taskIds.filter(value => value !== id);
                newSections.UrgentNotImportant.taskIds = newSections.UrgentNotImportant.taskIds.filter(value => value !== id);

                return {
                    ...state,
                    tasklist: newTaskList,
                    sections: newSections,
                    deleteTaskSuccess: true,
                    message: "Task Deleted Successfully"
                };
            }
        case CLEAR_REDUCER:
            return {
                ...state,
                addTaskSuccess: false,
                editTaskSuccess: false,
                deleteTaskSuccess: false,
            }
        default:
            return state;
    }
};

export default task;