import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/index";
import axios from "axios";
import Toast from "../../utils/toast";
const apiUrl = `${api.url}${api.mentor}`;
async function getApi() {
  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    return error;
  }
}

async function getCreateApi(action) {
  try {
    const { data } = await axios.post(`${apiUrl}create`, action.payload);
    Toast("MentorCreated successfully", true);
    return data;
  } catch (error) {
    Toast(error.message, false);
    return error;
  }
}

async function getUpdatedApi(action) {
  try {
    const { data } = await axios.patch(
      `${apiUrl}${action.mentorId}`,
      action.payload
    );
    Toast("MentorUpdated successfully", true);
    return data;
  } catch (error) {
    Toast(error.message, false);
    return error;
  }
}
async function getDeleteApi(action) {
  try {
    const res = await axios.delete(`${apiUrl}${action.mentorId}`);
    Toast("deleted mentor successfully", true);
    return res.data;
  } catch (error) {
    Toast(error.message, false);
    return error;
  }
}

function* fetchMentors() {
  try {
    const mentors = yield call(getApi);
    yield put({ type: "GET_MENTORS_SUCCESS", mentors: mentors });
  } catch (e) {
    yield put({ type: "GET_MENTORS_FAILED", message: e.message });
  }
}

function* createMentor(action) {
  try {
    const mentors = yield call(getCreateApi, action);
    yield put({ type: "CREATE_MENTORS_SUCCESS", mentors: mentors });
  } catch (e) {
    yield put({ type: "CREATE_MENTORS_FAILED", message: e.message });
  }
}

function* updateMentor(action) {
  try {
    const mentors = yield call(getUpdatedApi, action);
    yield put({ type: "UPDATE_MENTORS_SUCCESS", mentors: mentors });
  } catch (e) {
    yield put({ type: "UPDATE_MENTORS_FAILED", message: e.message });
  }
}

function* deleteMentor(action) {
  try {
    const mentors = yield call(getDeleteApi, action);
    yield put({ type: "DELETE_MENTORS_SUCCESS", mentors: mentors });
  } catch (e) {
    yield put({ type: "DELETE_MENTORS_FAILED", message: e.message });
  }
}

function* mentorsSaga() {
  yield takeLatest("GET_MENTORS_REQUESTED", fetchMentors);
  yield takeLatest("CREATE_MENTORS_REQUESTED", createMentor);
  yield takeLatest("UPDATE_MENTORS_REQUESTED", updateMentor);
  yield takeLatest("DELETE_MENTORS_REQUESTED", deleteMentor);
}

export default mentorsSaga;
