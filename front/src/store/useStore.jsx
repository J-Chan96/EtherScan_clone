import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/index.js'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const enhancer =
    process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middleware))
        : composeWithDevTools(applyMiddleware(...middleware))

export const store = createStore(rootReducer, enhancer)
sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

const Store = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default Store
