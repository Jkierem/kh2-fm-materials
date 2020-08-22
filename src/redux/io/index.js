import { nullaryActionCreator } from 'redux-utility'

export const SAVED_STATE = "kh/saved-state";
export const LOAD_STATE = "kh/load-state";

export const savedState = nullaryActionCreator(SAVED_STATE)
export const loadState = nullaryActionCreator(LOAD_STATE)