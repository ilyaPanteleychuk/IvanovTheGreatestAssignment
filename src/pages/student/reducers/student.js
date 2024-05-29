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

const initialState = {
  studentInfo: {},
  isFailed: false,
  isFailedUpdate: false,
  isFetching: false,
  isFetchingUpdate: false,
  isFinishedUpdate: false,
  isFetchingCreate: false,
  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessage: "",
}

const convertStudentInfo = (student) => ({
  id: student.id,
  name: student.name,
  surname: student.surname,
  averageGrade: student.averageGrade,
  groupId: student.groupId,
  groupName: student.groupName
})

export default function Reducer(state = initialState, action) {

  switch (action.type) {
    case REQUEST_RECEIVE_STUDENT: {
      return {
        ...state,
        isFailed: false,
        isFetching: true,
      }
    }

    case SUCCESS_RECEIVE_STUDENT: {
      return {
        ...state,
        isFailed: false,
        isFetching: false,
        studentInfo: convertStudentInfo(action.payload)
      }
    }

    case ERROR_RECEIVE_STUDENT: {
      return {
        ...state,
        isFailed: true,
        isFetching: false,
      }
    }

    case REQUEST_UPDATE_STUDENT: {
      return {
        ...state,
        isFetchingUpdate: true,
        isFailedUpdate: false,
        isFinishedUpdate: false,
        errorMessage: "",
      }
    }

    case SUCCESS_UPDATE_STUDENT: {
      return {
        ...state,
        isFetchingUpdate: false,
        isFailedUpdate: false,
        isFinishedUpdate: true,
        errorMessage: "",
        studentInfo: convertStudentInfo(action.payload),
      }
    }

    case ERROR_UPDATE_STUDENT: {
      const error = action.payload;
      const message = error[0]?.message
      return {
        ...state,
        isFetchingUpdate: false,
        isFailedUpdate: true,
        isFinishedUpdate: false,
        errorMessage: message
      }
    }

    case REQUEST_CREATE_STUDENT: {
      return {
        ...state,
        isFetchingCreate: true,
        isSuccessCreate: false,
        isErrorCreate: false,
      }
    }

    case SUCCESS_CREATE_STUDENT: {
      console.log("I`m here")
      return {
        ...state,
        isFetchingCreate: false,
        isSuccessCreate: true,
        isErrorCreate: false,
        studentInfo: convertStudentInfo(action.payload)
      }
    }

    case ERROR_CREATE_STUDENT: {
      const error = action.payload;
      const message = error[0]?.message
      return {
        ...state,
        isErrorCreate: true,
        isSuccessCreate: false,
        isFetchingCreate: false,
        errorMessage: message
      }
    }

    case RESET_STUDENT_DATA: {
      return initialState;
    }

    default: {
      return state;
    }
  }

}