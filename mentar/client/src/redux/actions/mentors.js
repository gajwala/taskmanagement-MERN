import * as type from "../types";

export function getMentors() {
  return {
    type: type.GET_MENTORS_REQUESTED,
  };
}
export function createMentor(payload) {
  return {
    type: type.CREATE_MENTORS_REQUESTED,
    payload: payload,
  };
}

export function deleteSingleMentor(id) {
  return {
    type: type.DELETE_MENTORS_REQUESTED,
    mentorId: id,
  };
}
export function updateMentorData(payload, id) {
  return {
    type: type.UPDATE_MENTORS_REQUESTED,
    payload: payload,
    mentorId: id,
  };
}
