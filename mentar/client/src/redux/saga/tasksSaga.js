import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api/index";
import axios from "axios";
import Toast from "../../utils/toast";
const apiUrl = `${api.url}${api.mentor}`;
const createTaskUrl = `${api.url}${api.createTask}`;
async function getApi(action) {
  try {
    const { data } = await axios.get(`${apiUrl}${action.payload}`);
    return data.task;
  } catch (error) {
    return error;
  }
}

function* fetchTasks(action) {
  try {
    const tasks = yield call(getApi, action);
    yield put({ type: "GET_TASK_SUCCESS", tasks: tasks });
  } catch (e) {
    yield put({ type: "GET_TASKS_FAILED", message: e.message });
  }
}
async function createtaskApi(action) {
  try {
    const { data } = await axios.post(createTaskUrl, action.payload);
    Toast("Task Created", true);
    return data;
  } catch (error) {
    Toast(error.message, false);
    return error;
  }
}

async function updateTaskApi(action) {
  try {
    const { data } = await axios.patch(
      `${api.url}task/${action.taskId}`,
      action.payload
    );
    Toast("Task Updated", true);
    return data;
  } catch (error) {
    Toast(error.message, false);
    return error;
  }
}

async function deleteTaskApi(action) {
  try {
    const res = await axios.delete(`${api.url}task/${action.taskId}`, {
      data: action.payload,
    });
    Toast("deleted Task successfully", true);
    return res.data;
  } catch (error) {
    Toast(error.message, false);
    return error;
  }
}

function* createTask(action) {
  try {
    const { task } = yield call(createtaskApi, action);
    yield put({ type: "CREATE_TASK_SUCCESS", tasks: task });
  } catch (e) {
    yield put({ type: "CREATE_TASKS_FAILED", message: e.message });
  }
}

function* updateTask(action) {
  try {
    const { task } = yield call(updateTaskApi, action);
    yield put({ type: "UPDATE_TASK_SUCCESS", tasks: task });
  } catch (e) {
    yield put({ type: "UPDATE_TASKS_FAILED", message: e.message });
  }
}

function* deleteTask(action) {
  try {
    const { task } = yield call(deleteTaskApi, action);
    yield put({ type: "DELETE_TASK_SUCCESS", tasks: task });
  } catch (e) {
    yield put({ type: "DELETE_TASKS_FAILED", message: e.message });
  }
}

function* tasksSaga() {
  yield takeLatest("CREATE_TASKS_REQUESTED", createTask);
  yield takeLatest("UPDATE_TASKS_REQUESTED", updateTask);
  yield takeLatest("DELETE_TASKS_REQUESTED", deleteTask);
  yield takeLatest("GET_TASKS_REQUESTED", fetchTasks);
}

export default tasksSaga;
