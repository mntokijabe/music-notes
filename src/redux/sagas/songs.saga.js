import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchSongInfo(action) {
    console.log('payload is', action.payload)
    try {

        const songInfo = yield axios.get(`/api/songs/${action.payload}`)
        yield put({ type: 'SET_SONG_INFO', payload: songInfo})
    } catch (error) {
        console.log('Error getting song info ',error)
    }
}

function* songs() {
  yield takeLatest('GET_SONG_INFO', fetchSongInfo);
//   yield takeLatest('GET_ACTIVE', fetchActiveSongs);
}

export default songs;
