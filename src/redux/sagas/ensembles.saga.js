import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEnsembles() {
  try {

    const response = yield axios.get('/api/ensembles');

    yield put({ type: 'SET_ENSEMBLES', payload: response.data });
  } catch (error) {
    console.log('Get ensembles request failed', error);
  }
}

function* fetchActiveSongs(action) {
    try {

        const activeSongs = yield axios.get(`/api/ensembles/${action.payload}`)
        yield put({ type: 'SET_ACTIVE_SONGS', payload: activeSongs})
    } catch (error) {
        console.log('Error getting active songs ',error)
    }
}

function* getEnsembles() {
  yield takeLatest('GET_ENSEMBLES', fetchEnsembles);
  yield takeLatest('GET_ACTIVE_SONGS', fetchActiveSongs);
}

export default getEnsembles;
