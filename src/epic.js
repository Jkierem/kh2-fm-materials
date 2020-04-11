import { combineEpics } from "redux-observable";
import { loadEpic, saveEpic } from "./redux/io/epics";

export default combineEpics(
    loadEpic,
    saveEpic,
)