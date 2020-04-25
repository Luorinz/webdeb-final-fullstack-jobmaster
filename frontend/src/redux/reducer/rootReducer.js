import { combineReducers } from "redux";
import jobList from './jobListReducer';
import account from './accountReducer';
import postedList from './postListReducer';
import savedList from './savedListReducer';
import reviewedList from './reviewedListReducer'
import profile from './profileReducer'

export default combineReducers({ jobList,account,postedList,savedList,reviewedList, profile });