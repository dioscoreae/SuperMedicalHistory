import { combineReducers } from "redux";
import logonInfo from "./logonInfo";
import patients from "./patients";

const rootReducer = combineReducers({
  patients,
  logonInfo,
});

export default rootReducer;