import { combineReducers } from "redux";
import cityReducer from "./cityReducer";

const rootReducer = combineReducers({
  cityR: cityReducer,
});

export default rootReducer;
