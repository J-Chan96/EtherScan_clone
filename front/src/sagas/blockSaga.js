import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { block_request, block_success, block_failure } from '../reducers/block'

async function blockAPI(action) {
    const result = await axios.post('http://localhost:4000/block/:idx', action)
    console.log(result)
    return result
}

function* block(action) {
    try {
        const result = yield call(blockAPI, action)
        yield put({
            type: block_success.toString(),
            payload: result.data,
        })
    } catch (e) {
        yield put({
            type: block_failure.toString(),
            payload: e.response.data,
        })
    }
}

export default function* BlockSaga() {
    yield takeLatest(block_request.toString(), block)
}
