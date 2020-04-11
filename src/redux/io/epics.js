import { map, withLatestFrom } from 'rxjs/operators'
import { ofType } from "redux-observable";
import { TRIGGER_MATERIAL, loadMaterials } from '../materials';
import { LOAD_STATE, savedState } from '.';
import { prop, compose } from 'ramda';
import Storage from '../../structures/storage';

export const loadEpic = action$ => action$.pipe(
    ofType(LOAD_STATE),
    map(Storage.load),
    map(compose(loadMaterials, prop("materials")))
)

export const saveEpic = (action$,state$) => action$.pipe(
    ofType(TRIGGER_MATERIAL),
    withLatestFrom(state$),
    map(([,state]) => Storage.save(state)),
    map(savedState)
)