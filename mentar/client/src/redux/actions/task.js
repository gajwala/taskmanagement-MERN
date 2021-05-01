import * as type from "../types";

export function getTask(payload) {
  return {
    type: type.GET_TASKS_REQUESTED,
    payload: payload,
  };
}

export function createTask(payload) {
  return {
    type: type.CREATE_TASKS_REQUESTED,
    payload: payload,
  };
}

export function updateTask(payload, id) {
  return {
    type: type.UPDATE_TASKS_REQUESTED,
    payload: payload,
    taskId: id,
  };
}

export function deleteSingleTask(payload, id) {
  return {
    type: type.DELETE_TASKS_REQUESTED,
    payload: payload,
    taskId: id,
  };
}
