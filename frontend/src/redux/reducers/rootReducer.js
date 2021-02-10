import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itineraryReducer from "./itineraryReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  cityR: cityReducer,
  itineraryR: itineraryReducer,
  authR: authReducer,
  userR: userReducer,
});

export default rootReducer;
