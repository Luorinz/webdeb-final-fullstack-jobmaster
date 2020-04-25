import Axios from 'axios'
import {HEROKU_PATH} from "../../rootPath";

export const REQUEST_JOB_LIST = "REQUEST_JOB_LIST";
export const RESPONSE_JOB_LIST_SUCCESS = "RESPONSE_JOB_LIST_SUCCESS";
export const RESPONSE_JOB_LIST_ERROR = "RESPONSE_JOB_LIST_ERROR";

function requestJobList() {
    return {
        type: REQUEST_JOB_LIST,
    }
}

function receiveJobListSuccess(jobList) {
    return {
        type: RESPONSE_JOB_LIST_SUCCESS,
        jobList: jobList,
    }
}
function receiveJobListError() {
    return {
        type: RESPONSE_JOB_LIST_ERROR,
    }
}

export default function getJobList(keyword) {
    return async function(dispatch) {
        dispatch(requestJobList());
        let jobList = [];
        console.log(keyword);
        try {
            let postJobs = await Axios.get(`${HEROKU_PATH}/job/search/localjob/${keyword}`);
            let outsideJobs = await Axios.get(`${HEROKU_PATH}/job/search/apijob/${keyword}`);
            jobList = jobList.concat(postJobs.data);
            jobList = jobList.concat(outsideJobs.data);
            console.log(jobList);
            dispatch(receiveJobListSuccess(jobList));
        } catch (e) {
            dispatch(receiveJobListError());
        }
    }
}