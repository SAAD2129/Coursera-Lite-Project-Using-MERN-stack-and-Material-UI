import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userInfo } from "./Reducers/Auth";
import { getCourses } from "./Reducers/CoursesFetch";

const initialState = {};

const reducer = combineReducers({
  authentication: userInfo,
  coursesData: getCourses,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
