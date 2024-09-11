import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getEnsembles from './ensembles.saga';
import songs from './songs.saga';
import genreList from './genres.saga';
import voicings from './voicings.saga';
import search from './search.saga';
import notes from './notes.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    getEnsembles(),
    songs(),
    genreList(),
    voicings(),
    search(),
    notes(),
  ]);
}
