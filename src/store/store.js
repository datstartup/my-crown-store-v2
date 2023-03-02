import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root', //persist the whole thing
    storage,
    whitelist: ['cart'],
};

// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user'],
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

// before action hit reducer, it it middleWares first
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(
    Boolean
);

// const middleWares = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//root-reducer

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
