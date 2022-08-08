import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import latest from './latest'
import block from './block'
import TranX from './tsx'
import all from './all'

const persist = {
    key: 'Chan',
    storage,
}

const rootReducer = combineReducers({
    latest,
    block,
    TranX,
    all,
})

export default persistReducer(persist, rootReducer)
