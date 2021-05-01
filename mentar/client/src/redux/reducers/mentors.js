import * as type from "../types";
const initialState = {
  mentors: [],
  loading: false,
  error: null,
};

export default function mentors(state = initialState, action) {
  switch (action.type) {
    case type.GET_MENTORS_REQUESTED:
    case type.UPDATE_MENTORS_REQUESTED:
    case type.CREATE_MENTORS_REQUESTED:
    case type.DELETE_MENTORS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_MENTORS_SUCCESS:
    case type.UPDATE_MENTORS_SUCCESS:
    case type.CREATE_MENTORS_SUCCESS:
    case type.DELETE_MENTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        mentors: action?.mentors ? action.mentors : state.mentors,
      };
    case type.GET_MENTORS_FAILED:
    case type.UPDATE_MENTORS_FAILED:
    case type.CREATE_MENTORS_FAILED:
    case type.DELETE_MENTORS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
