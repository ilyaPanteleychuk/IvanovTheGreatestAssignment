import axios from 'misc/requests';
import {
  ERROR_DELETE_STUDENT,
  ERROR_RECEIVE_STUDENTS,
  REQUEST_DELETE_STUDENT,
  REQUEST_RECEIVE_STUDENTS,
  SUCCESS_DELETE_STUDENT,
  SUCCESS_RECEIVE_STUDENTS
} from "../constants/actionTypes";

const requestReceiveStudents = () => ({
  type: REQUEST_RECEIVE_STUDENTS
});

const successReceiveStudents = (response) => ({
  type: SUCCESS_RECEIVE_STUDENTS,
  payload: response
});

const errorReceiveStudents = (response) => ({
  type: ERROR_RECEIVE_STUDENTS,
  payload: response
});

const getStudents = ({
  pageIndex,
  pageSize,
  searchText,
  gradeFilter,
  groupFilter,
}) => {
  return axios.post('http://localhost:8080/api/students/_search',
    {
      fullName: searchText,
      averageGrade: gradeFilter,
      groupId: groupFilter,
      page: pageIndex,
      size: pageSize
    });
}

const fetchStudents = ({
  pageIndex,
  pageSize,
  searchText,
  gradeFilter,
  groupFilter,
}) => (dispatch) => {
  dispatch(requestReceiveStudents());
  getStudents({
    pageIndex,
    pageSize,
    searchText,
    gradeFilter,
    groupFilter
  })
    .then(response => dispatch(successReceiveStudents(response)))
    .catch((error) => dispatch(errorReceiveStudents(error)));
}

const deleteStudent = (id) => {
  return axios.delete(`http://localhost:8080/api/students/${id}`)
}

const requestDeleteStudent = () => {
  return {
    type: REQUEST_DELETE_STUDENT
  }
}

const successDeleteStudent = (response) => {
  return {
    type: SUCCESS_DELETE_STUDENT,
    payload: response
  }
}

const errorDeleteStudent = (error) => {
  return {
    type: ERROR_DELETE_STUDENT,
    payload: error,
  }
}

const fetchDeleteStudent = ({
  id,
  pageIndex,
  pageSize,
  searchText,
  gradeFilter,
  groupFilter,
}) => (dispatch) => {
  dispatch(requestDeleteStudent());
  deleteStudent(id)
    .then(() => {
      return getStudents({
        pageIndex,
        pageSize,
        searchText,
        gradeFilter,
        groupFilter,
      });
    })
    .then((response) => {
      dispatch(successDeleteStudent(response));
    })
    .catch((error) => {
      dispatch(errorDeleteStudent(error));
    });
};

const exportFunctions = {
  fetchStudents,
  fetchDeleteStudent
}

export default exportFunctions;