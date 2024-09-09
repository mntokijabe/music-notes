import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVoicings() {
  try {

    const response = yield axios.get('/api/voicings');

    yield put({ type: 'SET_VOICINGS', payload: response});
  } catch (error) {
    console.log('Get voicings request failed', error);
  }
}

// function* fetchActiveSongs(action) {
//     try {

//         const activeSongs = yield axios.get(`/api/ensembles/${action.payload}`)
//         yield put({ type: 'SET_ACTIVE_SONGS', payload: activeSongs})
//     } catch (error) {
//         console.log('Error getting active songs ',error)
//     }
// }

function* getVoicings() {
  yield takeLatest('GET_VOICINGS', fetchVoicings);
//   yield takeLatest('GET_ACTIVE_SONGS', fetchActiveSongs);
}

export default getVoicings;
