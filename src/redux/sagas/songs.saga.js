import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import React from 'react';
import Swal from 'sweetalert2';


// gets the currently held data for a song
function* fetchSongInfo(action) {
    try {
        const songInfo = yield axios.get(`/api/songs/${action.payload}`)
        yield put({ type: 'SET_SONG_INFO', payload: songInfo})
    } catch (error) {
        console.log('Error getting song info ',error)
    }
}

// edits individual values of a song
function* editSong(action) {
    console.log('payload for edit is', action.payload)
    // try {
    yield axios.put('/api/edits',action.payload)
    Swal.fire({
        text: 'The edit was successful!',
        position: 'top',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    const {history} = action
    history.push(`/info/${action.payload.songId}`)
}

// deletes a genre from the selected song
function* deleteGenre(action) {
    const songId = action.payload.songId;
    try {
        yield axios.delete('/api/edits',{params:
            {songId: action.payload.songId,
             genreId: action.payload.genreId
            }
        })
        yield put({ type: 'GET_SONG_INFO', payload: action.payload.songId})

    } catch (error) {
        console.log('Error getting song info ',error)
    }
}

// adds a genre to a specific song
function* addGenre(action) {
    try {
        yield axios.post('/api/edits',action.payload)
        yield put({ type: 'GET_SONG_INFO', payload: action.payload.songId})
    } catch (error) {
        console.log('Error adding genre ',error)
    }
}

// adds an entirely new song
function* addNewSong(action) {
    try {
    const newId = yield axios.post('/api/songs',action.payload)
    yield put({ type: 'GET_SONG_INFO', payload: newId.data.id})
    Swal.fire({
        text: 'Adding song was successful!',
        position: 'top',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    const {history} = action
    history.push(`/info/${newId.data.id}`)
    } catch (error) {
        console.log('Error adding new song ',error)
    }
}

function* songs() {
  yield takeLatest('GET_SONG_INFO', fetchSongInfo);
  yield takeLatest('EDIT_SONG', editSong);
  yield takeLatest('DELETE_SONG_GENRE', deleteGenre)
  yield takeLatest('ADD_SONG_GENRE', addGenre)
  yield takeLatest('ADD_NEW_SONG', addNewSong)
}

export default songs;
