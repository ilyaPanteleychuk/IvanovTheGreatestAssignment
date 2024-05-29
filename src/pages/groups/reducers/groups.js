import {
  ERROR_RECEIVE_GROUPS,
  REQUEST_RECEIVE_GROUPS,
  SUCCESS_RECEIVE_GROUPS
} from "../actionTypes/actionTypes";

const initialState = {
  isFailed: false,
  isFetching: false,
  groups: [],
};

const convertGroups = (groups) => {
  return groups.map(group => ({
    id: group.id,
    name: group.name
  }))
}

export default function Reducer(state = initialState, action) {

  switch (action.type) {
    case REQUEST_RECEIVE_GROUPS: {
      return {
        ...state,
        isFetching: true,
        isFailed: false,
      }
    }
    case SUCCESS_RECEIVE_GROUPS: {
      const groups = convertGroups(action.payload)
      return {
        ...state,
        isFailed: false,
        isFetching: false,
        groups: groups
      };
    }
    case ERROR_RECEIVE_GROUPS: {
      return {
        ...state,
        isFailed: true,
        isFetching: false
      }
    }

    default: {
      return state;
    }
  }
}