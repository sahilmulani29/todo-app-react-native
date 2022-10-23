import { ADD_ITEM_ACTION, DELETE_ITEM_ACTION, SELECT_ITEM_ACTION } from "../../components/constant/constant";

// Initial State of application
const initialState = []

function TodoReducer (state = initialState, action) {
    switch(action.type){
        //Add item action
        case ADD_ITEM_ACTION : {
            return [...state , action.data];
        }
        // Delete Item action
        case DELETE_ITEM_ACTION : {
            return [...action.data];
        }
        // Default state
        default : {
            return state;
        }
    }
}

export default TodoReducer;