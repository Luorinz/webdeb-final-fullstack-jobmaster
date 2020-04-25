import { GET_SAVED_LIST } from '../action/savedListActions'
export function savedList(state = [], action) {
    switch (action.type) {
        case GET_SAVED_LIST:
            return action.savedList.slice();
        default:
            return state
    }
}
export default savedList;