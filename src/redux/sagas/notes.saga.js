import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// get the notes for the currently selected song
function* fetchNotes(action) {
  try {
    const response = yield axios.get(`/api/notes/${action.payload}`);
    yield put({ type: 'SET_NOTES', payload: response});
  } catch (error) {
    console.log('Get notes request failed', error);
  }
}

// add a new note for the currently selected song
function* addNotes(action) {
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
