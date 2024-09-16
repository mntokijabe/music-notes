import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets list of all ensemble groups
function* fetchEnsembles() { 
  try {
    const response = yield axios.get('/api/ensembles');
    yield put({ type: 'SET_ENSEMBLES', payload: response.data });
  } catch (error) {
    git ('Get ensembles request failed', error);
  }
}

// gets list of songs for the selected ensemble
function* fetchActiveSongs(action) {   
    try {
        const activeSongs = yield axios.get(`/api/ensembles/${action.payload}`)
        
        yield put({ type: 'SET_ACTIVE_SONGS', payload: activeSongs})
    } catch (error) {
        console.log('Error getting active songs ',error)
    }
}

//deletes a song from the active group for an ensemble
function* deleteActiveSong(action) {  
    try {
        yield axios.delete('/api/ensembles',{params: 
          {songId: action.payload.songId, ensembleId: action.payload.ensembleId}})
        yield put({ type: 'GET_ACTIVE_SONGS', payload: action.payload.ensembleId})
    } catch (error) {
        console.log('Error getting active songs ',error)
    }
}

// adds a song to the active group for an ensemble
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
