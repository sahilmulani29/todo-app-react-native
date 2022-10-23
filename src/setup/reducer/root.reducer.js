import { combineReducers } from "redux";
import TodoReducer from "../reducer/todo.reducer";

// Created Root Reducer so in fueture if additional functionality need to be add
// Dev can easily add respective reducer

const RootReducer = combineReducers({TodoReducer})

export default RootReducer;