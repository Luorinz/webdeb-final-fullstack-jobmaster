import Axios from 'axios'
import {HEROKU_PATH} from "../../rootPath";

export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const RESPONSE_PROFILE_SUCCESS = "RESPONSE_PROFILE_SUCCESS";
export const RESPONSE_PROFILE_ERROR = "RESPONSE_PROFILE_ERROR";

function requestProfile() {
  return {
    type: REQUEST_PROFILE,
  }
}

function receiveProfileSuccess(profile) {
  return {
    type: RESPONSE_PROFILE_SUCCESS,
    profile: profile,
  }
}
function receiveProfileError() {
  return {
    type: RESPONSE_PROFILE_ERROR,
  }
}

export default function getProfile(username) {
  return function(dispatch) {
    dispatch(requestProfile());
    Axios.get(`${HEROKU_PATH}/user/username/${username}`)
      .then(response=> dispatch(receiveProfileSuccess(response.data)),
            error=> dispatch(receiveProfileError())
        )
  }
}