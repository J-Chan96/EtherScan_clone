import { createAction } from 'redux-actions'

const initialState = {
    blockHash: null,
    blockNumber: null,
    contractAddress: null,
    cumulativeGasUsed: null,
    effectiveGasPrice: null,
    sender: null,
    gasUsed: null,
    status: null,
    receiver: null,
    transactionHash: null,
    transactionIndex: null,
    type: null,
}

const TX = {
    REQUEST: 'TX_REQUEST',
    SUCCESS: 'TX_SUCCESS',
    FAILURE: 'TX_FAILURE',
}

export const tx_request = createAction(TX.REQUEST, (payload) => payload)
export const tx_success = createAction(TX.SUCCESS, (payload) => payload)
export const tx_failure = createAction(TX.FAILURE, (payload) => payload)

const TranX = (state = initialState, action) => {
    switch (action.type) {
        case TX.REQUEST:
            return {
                ...state,
            }
        case TX.SUCCESS:
            const {
                blockHash,
                blockNumber,
                contractAddress,
                cumulativeGasUsed,
                effectiveGasPrice,
                sender,
                gasUsed,
                status,
                receiver,
                transactionHash,
                transactionIndex,
                type,
            } = action.payload
            return {
                ...state,
                blockHash,
                blockNumber,
                contractAddress,
                cumulativeGasUsed,
                effectiveGasPrice,
                sender,
                gasUsed,
                status,
                receiver,
                transactionHash,
                transactionIndex,
                type,
            }
        case TX.FAILURE:
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}

export default TranX
