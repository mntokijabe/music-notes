import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEnsembles() {
  try {

    const response = yield axios.get('/api/ensembles');

    yield put({ type: 'SET_ENSEMBLES', payload: response.data });
  } catch (error) {
    console.log('Get ensembles request failed', error);
  }
}

function* fetchActiveSongs(action) {
  console.log('in fetchActiveSongs')
    try {

        const activeSongs = yield axios.get(`/api/ensembles/${action.payload}`)
        yield put({ type: 'SET_ACTIVE_SONGS', payload: activeSongs})
    } catch (error) {
        console.log('Error getting active songs ',error)
    }
}

function* deleteActiveSong(action) {
  console.log('in fetchActiveSongs with payload', action.payload)
    try {

        yield axios.delete('/api/ensembles',{params: 
          {songId: action.payload.songId, ensembleId: action.payload.ensembleId}})
        yield put({ type: 'GET_ACTIVE_SONGS', payload: action.payload.ensembleId})
    } catch (error) {
        console.log('Error getting active songs ',error)
    }
}
function* addToRepertoire (action) {
  try {

      yield axios.post('/api/ensembles',action.payload)
      yield put({ type: 'GET_ACTIVE_SONGS', payload:action.payload.ensemble_id})
  } catch (error) {
      console.log('Error getting active songs ',error)
  }
}


function* getEnsembles() {
  yield takeLatest('GET_ENSEMBLES', fetchEnsembles);
  yield takeLatest('GET_ACTIVE_SONGS', fetchActiveSongs);
  yield takeLatest('ADD_TO_REPERTOIRE', addToRepertoire);
  yield takeLatest('DELETE_ACTIVE_SONG', deleteActiveSong);
}

export default getEnsembles;
