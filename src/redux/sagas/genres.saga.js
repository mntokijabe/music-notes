import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGenres() {
  try {

    const response = yield axios.get('/api/genres');

    yield put({ type: 'SET_GENRES', payload: response});
  } catch (error) {
    console.log('Get genres request failed', error);
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

function* getGenres() {
  yield takeLatest('GET_GENRES', fetchGenres);
//   yield takeLatest('GET_ACTIVE_SONGS', fetchActiveSongs);
}

export default getGenres;
