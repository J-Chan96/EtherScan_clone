import { all } from 'redux-saga/effects'
import latestSaga from './latestSaga'
import BlockSaga from './blockSaga'
import TxSaga from './txSaga'
import allSaga from './allSaga'

export default function* rootSaga() {
    yield all([latestSaga(), BlockSaga(), TxSaga(), allSaga()])
}
