import { combineReducers } from "redux";
import users from "./users";
import mentors from "./mentors";
import tasks from "./tasks";
import loader from "./loader";
const rootReducer = combineReducers({
  user: users,
  mentors: mentors,
  tasks: tasks,
  loader: loader,
});

export default rootReducer;
