import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// gets the list of voicings
function* fetchVoicings() {
  try {
    const response = yield axios.get('/api/voicings');
    yield put({ type: 'SET_VOICINGS', payload: response});
  } catch (error) {
    console.log('Get voicings request failed', error);
  }
}


function* getVoicings() {
  yield takeLatest('GET_VOICINGS', fetchVoicings);
}

export default getVoicings;
