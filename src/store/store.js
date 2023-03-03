import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root', //persist the whole thing
    storage,
    whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// before action hit reducer, it it middleWares first
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
].filter(Boolean);

// const middleWares = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//root-reducer

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
