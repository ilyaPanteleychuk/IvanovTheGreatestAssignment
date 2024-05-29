import axios from "../../../misc/requests";
import {
  ERROR_RECEIVE_GROUPS,
  REQUEST_RECEIVE_GROUPS,
  SUCCESS_RECEIVE_GROUPS
} from "../actionTypes/actionTypes";

const requestReceiveGroups = () => {
  return {
    type: REQUEST_RECEIVE_GROUPS
  }
};

const successReceiveGroups = (response) => {
  return {
    type: SUCCESS_RECEIVE_GROUPS,
    payload: response
  }
}

const errorReceiveGroups = () => {
  return {
    type: ERROR_RECEIVE_GROUPS
  }
}

const getGroups = () => {
  return axios.get('http://localhost:8080/api/groups');
}

const fetchGroups = () => (dispatch) => {
  dispatch(requestReceiveGroups());
  getGroups()
    .then(response => dispatch(successReceiveGroups(response)))
    .catch(() => dispatch(errorReceiveGroups()));
}

const exportFunctions = {
  fetchGroups
}

export default exportFunctions;