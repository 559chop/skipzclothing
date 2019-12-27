import {
    createStore,
    applyMiddleware
} from 'redux'
import {
    persistStore
} from 'redux-persist'
import logger from 'redux-logger'
import rootReducer from './root-reducer'

const middlewares = []

//uses logger only during development not production
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

// persistent storage for redux store
export const persistor = persistStore(store)

export default {
    store,
    persistor
}