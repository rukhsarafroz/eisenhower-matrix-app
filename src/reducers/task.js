import initialData from "../mockData/initialData";

const initialState = {
    ...initialData,
};


const task = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
};

export default task;