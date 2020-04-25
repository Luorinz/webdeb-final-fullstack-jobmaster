import { REQUEST_JOB_LIST, RESPONSE_JOB_LIST_ERROR,
    RESPONSE_JOB_LIST_SUCCESS } from '../action/jobListActions'
const initState = {
    requestStatus: "NONE",
    inFlight: false,
    jobList:[]
}
export function jobList(state = initState, action) {
    switch (action.type) {
        case REQUEST_JOB_LIST:
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case RESPONSE_JOB_LIST_ERROR:
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case RESPONSE_JOB_LIST_SUCCESS:
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                jobList: action.jobList,
                inFlight: false,
            });
        default:
            return state
    }
}
export default jobList;