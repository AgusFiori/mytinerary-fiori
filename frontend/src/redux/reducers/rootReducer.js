import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itineraryReducer from "./itineraryReducer.js";

const rootReducer = combineReducers({
  cityR: cityReducer,
  itineraryR: itineraryReducer,
});

export default rootReducer;
