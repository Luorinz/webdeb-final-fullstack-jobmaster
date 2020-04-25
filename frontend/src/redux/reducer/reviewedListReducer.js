import { GET_REVIEWED_LIST} from '../action/reviewedListActions'

export function postedList(state = [], action) {
  switch (action.type) {
    case GET_REVIEWED_LIST:
      return action.reviewedList.slice();
    default:
      return state
  }
}
export default postedList;