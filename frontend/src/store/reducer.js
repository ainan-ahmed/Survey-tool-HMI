import { combineReducers } from 'redux';
import usersReducer from "./users";
import surveysReducer from "./surveys";
import entriesReducer from "./entries";
import answersReducer from "./answers";
import questionsReducer from "./questions";
import errorsReducer from "./errors";
export default combineReducers({
  auth: usersReducer,
  surveys: surveysReducer,
  answers: answersReducer,
  questions: questionsReducer,
  entries: entriesReducer,
  errors:  errorsReducer
});