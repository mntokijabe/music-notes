import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchNotes(action) {
  try {

    const response = yield axios.get(`/api/notes/${action.payload}`);
    yield put({ type: 'SET_NOTES', payload: response});
  } catch (error) {
    console.log('Get notes request failed', error);
  }
}

function* addNotes(action) {
    console.log('in add notes')
    try {
        yield axios.post('/api/notes',action.payload)
        yield put({ type: 'GET_NOTES', payload: action.payload.songId})
    } catch (error) {
        console.log('Error adding notes ',error)
    }
}

function* notes() {
  yield takeLatest('GET_NOTES', fetchNotes);
  yield takeLatest('ADD_NOTES', addNotes);
}

export default notes;
