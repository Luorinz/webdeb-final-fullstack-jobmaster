import Axios from 'axios'
import {HEROKU_PATH} from "../../rootPath";

export const REQUEST= "REQUEST";
export const RESPONSE_LOGIN_SUCCESS = "RESPONSE_LOGIN_SUCCESS";
export const RESPONSE_LOGOUT_SUCCESS = "RESPONSE_LOGOUT_SUCCESS";
export const RESPONSE_ERROR = "RESPONSE_ERROR";
export const RESET_ACCOUNT = "RESET_ACCOUNT";

function request() {
    return {
        type: REQUEST,
    }
}

function receiveLoginSuccess(info) {
    return {
        type: RESPONSE_LOGIN_SUCCESS,
        info: info,
    }
}
function receiveLogoutSuccess() {
    return {
        type: RESPONSE_LOGOUT_SUCCESS,
    }
}

function receiveError() {
    return {
        type: RESPONSE_ERROR,
    }
}
export function resetAccount() {
    return {
        type: RESET_ACCOUNT,
    }
}


export function login(keyPair) {
    return function(dispatch) {
        dispatch(request());
        Axios.post(`${HEROKU_PATH}/auth/login`, keyPair)
          .then(response=> dispatch(receiveLoginSuccess(response.data)),
                error=> dispatch(receiveError())
          );
    }
}


export function logout(token) {
    return async function(dispatch) {
        dispatch(request());
        try {
            await Axios.get( `${HEROKU_PATH}/auth/logout`,
                {headers: {Authorization: `Bearer ${token}`}}
                )
            dispatch(receiveLogoutSuccess());
        } catch (e) {
            dispatch(receiveError());
        }
    }
}
