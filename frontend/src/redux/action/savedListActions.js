import Axios from 'axios'
import {HEROKU_PATH} from "../../rootPath";
export const GET_SAVED_LIST = "GET_SAVED_LIST";
function getSavedList(savedList) {
    return {
        type: GET_SAVED_LIST,
        savedList: savedList,
    }
}
export function fetchSavedList(token, errHandler) {
    return function(dispatch) {
        Axios.get(	`${HEROKU_PATH}/user/jobs`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then(
                response=> dispatch(getSavedList(response.data)),
                errHandler
        )
    }
}

export function addToSavedList(token, job) {
    return async function(dispatch) {
        try{
            await Axios.post(`${HEROKU_PATH}/user/save/${job.id}`, job,
              {headers: {Authorization: `Bearer ${token}`}});
            await Axios.post(`${HEROKU_PATH}/user/save`, job,
              {headers: {Authorization: `Bearer ${token}`}});
            await dispatch(fetchSavedList(token, ()=>alert("fail when fetch")));
            alert("save job success!");
        } catch (e) {
            alert("fail when post");
        }
    }
}
export function deleteFromSavedList(token, job, errHandler) {
    return function(dispatch) {
        Axios.post(`${HEROKU_PATH}/user/unsave/${job.id}`, job,
          {headers: {Authorization: `Bearer ${token}`}})
          .then(
            response => dispatch(fetchSavedList(token, errHandler)),
            errHandler
          )
    }
}

