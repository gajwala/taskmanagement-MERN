import * as type from "../types";
const initialState = {
  loading: false,
};

export default function loader(state = initialState, action) {
  switch (action.type) {
    case type.GET_MENTORS_REQUESTED:
    case type.CREATE_MENTORS_REQUESTED:
    case type.DELETE_MENTORS_REQUESTED:
    case type.GET_TASKS_REQUESTED:
    case type.DELETE_TASKS_REQUESTED:
    case type.CREATE_TASKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_MENTORS_SUCCESS:
    case type.CREATE_MENTORS_SUCCESS:
    case type.DELETE_MENTORS_SUCCESS:
    case type.GET_TASK_SUCCESS:
    case type.UPDATE_TASK_SUCCESS:
    case type.DELETE_TASK_SUCCESS:
    case type.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.GET_MENTORS_FAILED:
    case type.CREATE_MENTORS_FAILED:
    case type.DELETE_MENTORS_FAILED:
    case type.GET_TASKS_FAILED:
    case type.UPDATE_TASKS_FAILED:
    case type.DELETE_TASKS_FAILED:
    case type.CREATE_TASKS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
