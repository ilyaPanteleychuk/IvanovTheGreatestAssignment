import {combineReducers} from "redux";
import student from './student';
import groups from '../../groups/reducers/groups';

export default combineReducers({
  student, groups
})