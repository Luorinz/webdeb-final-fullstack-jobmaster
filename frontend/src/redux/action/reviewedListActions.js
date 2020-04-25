import Axios from 'axios'
import {HEROKU_PATH} from "../../rootPath";

export const GET_REVIEWED_LIST = "GET_REVIEWED_LIST";


function getReviewedList(reviewedList) {
  return {
    type: GET_REVIEWED_LIST,
    reviewedList: reviewedList,
  }
}

export function fetchReviewedList(token, errHandler) {
  return function(dispatch) {
    Axios.get(	`${HEROKU_PATH}/job/search/localjob`)
      .then(
        response=> dispatch(getReviewedList(response.data)),
        errHandler
      )
  }
}

export function updateToReviewed(token, job, errHandler) {
  return function(dispatch) {
    Axios.put(`${HEROKU_PATH}/user/review/${job.id}`, job,
      {headers: {Authorization: `Bearer ${token}`}})
      .then(
        response => dispatch(fetchReviewedList(token,errHandler)),
        errHandler
      )
  }
}

export function updateToPassed(token, job, errHandler) {
  return function(dispatch) {
    Axios.put(`${HEROKU_PATH}/user/pass/${job.id}`, job,
      {headers: {Authorization: `Bearer ${token}`}})
      .then(
        response => dispatch(fetchReviewedList(token,errHandler)),
        errHandler
      )
  }
}

