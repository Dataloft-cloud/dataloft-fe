import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CREATE_DATALOFT_ACCOUNT_REQUEST,
  createDataloftAccountSuccess,
  createDataloftAccountFailure,
  FC_CHAIN_HEAD_REQUEST,
  fcChainHeadSuccess,
  fcChainHeadFailure,
  CREATE_METAMASK_ACCOUNT_REQUEST,
  createMetamaskAccountSuccess,
  createMetamaskAccountFailure,
  GET_METAMASK_ADDRESS_REQUEST,
  getMetamaskAddressSuccess,
  getMetamaskAddressFailure,
} from './actions'

import {
  createDataloftAccount,
  createMetamaskAccount,
  getMetamaskAddress,
  fcChainHead
} from 'services/api'

function* createMetamaskAccountRequest(payload, meta) {
  try {
    const { username, password, address } = payload
    const data = yield call(createMetamaskAccount, username, password, address)

    if (data.response) {
      yield put(createMetamaskAccountSuccess(data.response, meta))
    } else {
      yield put(createMetamaskAccountFailure(data.error))
    }
  } catch (error) {
    yield put(createMetamaskAccountFailure(error))
  }
}

function* createDataloftAccountRequest(payload, meta) {
  try {
    const { username, password } = payload
    const data = yield call(createDataloftAccount, username, password)
    
    if (data.response) {
      yield put(createDataloftAccountSuccess(data.response, meta))
    } else {
      yield put(createDataloftAccountFailure(data.error))
    }
  } catch (error) {
    yield put(createDataloftAccountFailure(error))
  }
}

function* fcChainHeadRequest(payload, meta) {
  try {
    const data = yield call(fcChainHead)

    if (data.response) {
      yield put(fcChainHeadSuccess(data.response, meta))
    } else {
      yield put(fcChainHeadFailure(data.error))
    }
  } catch (error) {
    yield put(fcChainHeadFailure(error))
  }
}

function* getMetamaskAddressRequest(payload, meta) {
  try{
    const { address } = payload
    const data = yield call(getMetamaskAddress, address)

    if (data.resolve) {
      yield put(getMetamaskAddressSuccess(data.resolve, meta))
    } else {
      yield put(getMetamaskAddressFailure(data.error))
    }

  } catch (error) {
    yield put(getMetamaskAddressFailure(error))
  }
}

function* watchCreateDataloftAccountRequest({ payload, meta }) {
  yield call(createDataloftAccountRequest, payload, meta)
}

function* watchfcChainHeadRequest({ payload, meta }) {
  yield call(fcChainHeadRequest, payload, meta)
}

function* watchCreateMetamaskAccountRequest({ payload, meta }) {
  yield call(createMetamaskAccountRequest, payload, meta)
}

function* watchGetMetamaskAddressRequest({ payload, meta }) {
  yield call(getMetamaskAddressRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_DATALOFT_ACCOUNT_REQUEST, watchCreateDataloftAccountRequest)
  yield takeEvery(FC_CHAIN_HEAD_REQUEST, watchfcChainHeadRequest)
  yield takeEvery(CREATE_METAMASK_ACCOUNT_REQUEST, watchCreateMetamaskAccountRequest)
  yield takeEvery(GET_METAMASK_ADDRESS_REQUEST, watchGetMetamaskAddressRequest)
}
