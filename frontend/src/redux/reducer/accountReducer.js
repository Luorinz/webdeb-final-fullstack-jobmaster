import {
    REQUEST, RESPONSE_LOGIN_SUCCESS,
    RESPONSE_LOGOUT_SUCCESS, RESPONSE_ERROR, RESET_ACCOUNT
} from '../action/accountActions'
const initState = {
    requestStatus: "NONE",
    inFlight: false,
    isLogin: false,
    userDetail:{},
    token:""
}
export function account(state = initState, action) {
    switch (action.type) {
        case REQUEST:
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case RESPONSE_ERROR:
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case RESPONSE_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                requestStatus: "LOGIN_SUCCESS",
                token:action.info.token,
                userDetail: action.info.userDetail,
                inFlight: false,
                isLogin: true,
            });
        case RESPONSE_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                requestStatus: "LOGOUT_SUCCESS",
                token:"",
                userDetail: {},
                inFlight: false,
                isLogin: false,
            });
        case RESET_ACCOUNT:
            return initState;
        default:
            return state
    }
}
export default account;