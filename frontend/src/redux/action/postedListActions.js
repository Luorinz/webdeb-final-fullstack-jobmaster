import Axios from 'axios'
import {HEROKU_PATH} from "../../rootPath";

export const GET_POSTED_LIST = "GET_POSTED_LIST";


function getPostedList(postedList) {
    return {
        type: GET_POSTED_LIST,
        postedList: postedList,
    }
}

export function fetchPostedList(token, errHandler) {
    return function(dispatch) {
        Axios.get(	`${HEROKU_PATH}/user/post/jobs`,
          {headers: {Authorization: `Bearer ${token}`}})
          .then(
            response=> dispatch(getPostedList(response.data)),
            errHandler
          )
    }
}

export function addToPostedList(token, job, errHandler) {
    return function(dispatch) {
        Axios.post(`${HEROKU_PATH}/user/post`, job,
          {headers: {Authorization: `Bearer ${token}`}})
          .then(
            response => dispatch(fetchPostedList(token,errHandler)),
            errHandler
          )
    }
}

export function updatePostedList(token, job, errHandler) {
    return function(dispatch) {
        Axios.put(`${HEROKU_PATH}/user/updatejob`, job,
          {headers: {Authorization: `Bearer ${token}`}})
          .then(
            response => dispatch(fetchPostedList(token,errHandler)),
            errHandler
          )
    }
}

export function deleteFromPostedList(token, job, errHandler) {
    return function(dispatch) {
        Axios.delete(`${HEROKU_PATH}/user/delete/${job.id}`,
          {headers: {Authorization: `Bearer ${token}`}})
          .then(
            response => dispatch(fetchPostedList(token,errHandler)),
            errHandler
          )
    }
}

