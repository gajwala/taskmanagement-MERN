import userSaga from "./userSaga";
import mentorsSaga from "./mentors";
import tasksSaga from "./tasksSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([userSaga(), mentorsSaga(), tasksSaga()]);
}
