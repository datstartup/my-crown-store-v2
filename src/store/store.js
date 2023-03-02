import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root', //persist the whole thing
    storage,
    blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// before action hit reducer, it it middleWares first
const middleWares = [
    process.env.NODE_ENV === 'development' && logger,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

//root-reducer

export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

export const persistor = persistStore(store);
