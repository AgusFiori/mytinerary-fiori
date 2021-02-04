import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itineraryReducer from "./itineraryReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  cityR: cityReducer,
  itineraryR: itineraryReducer,
  authR: authReducer,
});

export default rootReducer;
