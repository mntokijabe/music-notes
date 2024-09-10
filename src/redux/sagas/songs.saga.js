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

function* editSong(action) {
    console.log('payload for edit is', action.payload)
    // try {

    yield axios.put(`/api/songs/${action.payload}`)
    //     yield put({ type: 'SET_SONG_INFO', payload: songInfo})
    // } catch (error) {
    //     console.log('Error getting song info ',error)
    // }
}

function* deleteGenre(action) {
    console.log('payload for deletegenre is', action.payload)
    // try {

    //     const songInfo = yield axios.get(`/api/songs/${action.payload}`)
    //     yield put({ type: 'SET_SONG_INFO', payload: songInfo})
    // } catch (error) {
    //     console.log('Error getting song info ',error)
    // }
}
function* addGenre(action) {
    console.log('payload for addgenre is', action.payload)
    try {

    yield axios.post('/api/songs',action.payload)
    yield put({ type: 'GET_SONG_INFO', payload: action.payload.songId})
    } catch (error) {
        console.log('Error adding genre ',error)
    }
}

function* songs() {
  yield takeLatest('GET_SONG_INFO', fetchSongInfo);
  yield takeLatest('EDIT_SONG', editSong);
  yield takeLatest('DELETE_SONG_GENRE', deleteGenre)
  yield takeLatest('ADD_SONG_GENRE', addGenre)
}

export default songs;
