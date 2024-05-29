import {combineReducers} from "redux";
import students from './students';
import groups from '../../groups/reducers/groups';

export default combineReducers({
  students, groups
})