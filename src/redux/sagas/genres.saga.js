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


function* getGenres() {
  yield takeLatest('GET_GENRES', fetchGenres);

}

export default getGenres;
