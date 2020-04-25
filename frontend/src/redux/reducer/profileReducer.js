import { REQUEST_PROFILE, RESPONSE_PROFILE_SUCCESS,
  RESPONSE_PROFILE_ERROR } from '../action/profileActions'
const initState = {
  requestStatus: "NONE",
  inFlight: false,
  profile:{}
}
export function profile(state = initState, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      return Object.assign({}, state, {
        requestStatus: "SENDING",
        inFlight: true,
      });
    case RESPONSE_PROFILE_ERROR:
      return Object.assign({}, state, {
        requestStatus: "ERROR",
        inFlight: false,
      });
    case RESPONSE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        requestStatus: "SUCCESS",
        profile: action.profile,
        inFlight: false,
      });
    default:
      return state
  }
}
export default profile;