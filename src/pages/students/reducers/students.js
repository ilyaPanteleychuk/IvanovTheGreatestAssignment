import {
  ERROR_DELETE_STUDENT,
  ERROR_RECEIVE_STUDENTS,
  REQUEST_DELETE_STUDENT,
  REQUEST_RECEIVE_STUDENTS,
  SUCCESS_DELETE_STUDENT,
  SUCCESS_RECEIVE_STUDENTS
} from "../constants/actionTypes";

const initialState = {
  isFailed: false,
  isFetching: false,
  isSuccess: false,
  isFetchingDelete: false,
  isErrorDelete: false,
  isSuccessDelete: false,
  students: [],
  errorMessage: '',
  totalCount: 0
};

const convertStudents = (students) => {
  return students.map(std => ({
    id: std.id,
    name: std.name,
    surname: std.surname,
    fullName: std.fullName,
    groupId: std.groupId,
    groupName: std.groupName,
    averageGrade: std.averageGrade,
  }))
}

export default function Reducer(state = initialState, action) {

  switch (action.type) {
    case REQUEST_RECEIVE_STUDENTS: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isFailed: false,
      }
    }
    case SUCCESS_RECEIVE_STUDENTS: {
      const students = convertStudents(action.payload.studentDtos);
      return {
        ...state,
        isFailed: false,
        isFetching: false,
        isSuccess: true,
        students: students,
        totalCount: action.payload.totalElement
      };
    }
    case ERROR_RECEIVE_STUDENTS: {
      return {
        ...state,
        isFailed: true,
        isFetching: false,
        isSuccess: false,
      }
    }

    case REQUEST_DELETE_STUDENT: {
      return {
        ...state,
        isFetchingDelete: true,
        isErrorDelete: false,
        isSuccessDelete: false,
      }
    }

    case SUCCESS_DELETE_STUDENT: {
      const students = convertStudents(action.payload.studentDtos);
      return {
        ...state,
        isErrorDelete: false,
        isFetchingDelete: false,
        isSuccessDelete: true,
        students: students,
        totalCount: action.payload.totalElement
      };
    }

    case ERROR_DELETE_STUDENT: {
      return {
        ...state,
        isErrorDelete: true,
        isSuccessDelete: false,
        isFetchingDelete: false,
      }
    }

    default: {
      return state;
    }
  }
}