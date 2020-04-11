import { combineReducers } from "redux";
import materialReducer from './redux/materials'

export default combineReducers({
    materials: materialReducer
})