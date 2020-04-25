import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducer/rootReducer";
import thunkMiddleware from 'redux-thunk';

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));