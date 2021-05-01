import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/index";
import axios from "axios";
import Toast from "../../utils/toast";
const apiUrl = `${api.url}${api.login}`;
async function getApi(action) {
  try {
    const { data } = await axios.post(apiUrl, action.payload);
    Toast("Login successfully", true);
    return data.result;
  } catch (error) {
    Toast(error?.response?.data?.message, false);
    return error;
  }
}

function* fetchUsers(action) {
  try {
    const user = yield call(getApi, action);
    yield put({ type: "GET_USERS_SUCCESS", user: user });
  } catch (e) {
    yield put({ type: "GET_USERS_FAILED", message: e.message });
  }
}

function* logoutUser(action) {
  try {
    yield put({ type: "LOGOUT_USER_SUCCESS", user: {} });
  } catch (e) {
    yield put({ type: "LOGOUT_USER_FAILED", message: e.message });
  }
}

function* userSaga() {
  yield takeLatest("GET_USERS_REQUESTED", fetchUsers);
  yield takeLatest("LOGOUT_USERS_REQUESTED", logoutUser);
}

export default userSaga;
