import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducer';
import epic from './epic';

const epicMiddleware = createEpicMiddleware()

export const initStore = () => {
    const composeEnhancers = 
        process.env.NODE_ENV === "development" ? 
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : 
            compose;

    const enhancers = [
        epicMiddleware,
    ]
    
    const store = createStore(
        reducer,
        {},
        composeEnhancers(
            applyMiddleware(...enhancers)
        )
    )

    epicMiddleware.run(epic);

    return store
}