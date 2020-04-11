import { Actions, Reducers } from 'redux-utility'
import { evolve, not, when, propSatisfies, isNil, assoc, propOr, compose } from 'ramda';

const { unaryActionCreator } = Actions;
const { createReducer } = Reducers

const triggerProp = (name,obj) => compose(
    evolve({ [name]: not }),
    when(
        propSatisfies(isNil,name),
        assoc(name,false)
    )
)(obj)

export const TRIGGER_MATERIAL="kh/trigger-material";
export const LOAD_MATERIALS = "kh/load-materials";

const reducer = createReducer({
    [TRIGGER_MATERIAL]: (state,action) => {
        const { payload } = action;
        return triggerProp(payload,state);
    },
    [LOAD_MATERIALS]: (state,action) => {
        return propOr({},"payload",action);
    }
})

export default reducer

export const triggerMaterial = unaryActionCreator(TRIGGER_MATERIAL);
export const loadMaterials = unaryActionCreator(LOAD_MATERIALS);