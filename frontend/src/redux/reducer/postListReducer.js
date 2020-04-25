import { GET_POSTED_LIST} from '../action/postedListActions'

export function postedList(state = [], action) {
    switch (action.type) {
        case GET_POSTED_LIST:
            return action.postedList.slice();
        default:
            return state
    }
}
export default postedList;