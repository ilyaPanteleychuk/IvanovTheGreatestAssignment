import axios from "../../../misc/requests";
import {
  ERROR_CREATE_STUDENT,
  ERROR_RECEIVE_STUDENT,
  ERROR_UPDATE_STUDENT,
  REQUEST_CREATE_STUDENT,
  REQUEST_RECEIVE_STUDENT,
  REQUEST_UPDATE_STUDENT,
  RESET_STUDENT_DATA,
  SUCCESS_CREATE_STUDENT,
  SUCCESS_RECEIVE_STUDENT,
  SUCCESS_UPDATE_STUDENT
} from "../constants/actionTypes";

const resetStudentData = () => ({
  type: RESET_STUDENT_DATA
});

const fetchResetStudentData = () => (dispatch) => {
  dispatch(resetStudentData());
}

const requestReceiveStudent = () => ({
  type: REQUEST_RECEIVE_STUDENT
});

const successReceiveStudent = (response) => ({
  type: SUCCESS_RECEIVE_STUDENT,
  payload: response
});

const errorReceiveStudent = () => ({
  type: ERROR_RECEIVE_STUDENT
});

const getStudent = (id) => {
  return axios.get(`http://localhost:8080/api/students/${id}`);
};

const fetchReceiveStudent = (id) => (dispatch) => {
  dispatch(requestReceiveStudent());
  getStudent(id)
    .then(response => dispatch(successReceiveStudent(response)))
    .catch(() => dispatch(errorReceiveStudent()));
}

const requestUpdateStudent = () => ({
  type: REQUEST_UPDATE_STUDENT
});

const successUpdateStudent = (response) => ({
  type: SUCCESS_UPDATE_STUDENT,
  payload: response
});

const errorUpdateStudent = (error) => ({
  type: ERROR_UPDATE_STUDENT,
  payload: error
});

const updateStudent = ({
  id,
  name,
  surname,
  averageGrade,
  groupId,
  groupName
}) => {
  return axios.put(`http://localhost:8080/api/students/${id}`, {
    name,
    surname,
    averageGrade,
    groupId,
    groupName
  });
};

const fetchUpdateStudent = ({
  id,
  name,
  surname,
  averageGrade,
  groupId,
  groupName
}) => (dispatch) => {
  dispatch(requestUpdateStudent());
  updateStudent({id, name, surname, averageGrade, groupId, groupName})
    .then(response => dispatch(successUpdateStudent(response)))
    .catch(error => dispatch(errorUpdateStudent(error)));
}

const requestCreateStudent = () => ({
  type: REQUEST_CREATE_STUDENT,
});

const successCreateStudent = (response) => ({
  type: SUCCESS_CREATE_STUDENT,
  payload: response
});

const errorCreateStudent = (error) => ({
  type: ERROR_CREATE_STUDENT,
  payload: error,
});

const createStudent = ({
  name,
  surname,
  averageGrade,
  groupId,
}) => {
  return axios.post(`http://localhost:8080/api/students`, {
    name,
    surname,
    averageGrade,
    groupId,
  });
}

const fetchCreateStudent = ({
  name,
  surname,
  averageGrade,
  groupId,
}) => (dispatch) => {
  dispatch(requestCreateStudent());
  createStudent({ name, surname, averageGrade, groupId})
    .then(response => dispatch(successCreateStudent(response)))
    .catch((error) => { dispatch(errorCreateStudent(error))})
}

const exportFunctions = {
  fetchReceiveStudent,
  fetchUpdateStudent,
  fetchCreateStudent,
  fetchResetStudentData
}

export default exportFunctions;
