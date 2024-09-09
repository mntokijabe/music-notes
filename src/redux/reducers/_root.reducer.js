import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import ensembles from './ensembles.reducer';
import activeSongs from './activeSongs.reducer';
import songInfo from './songInfo.reducer';
import genreInfo from './genreInfo.reducer';
import genreList from './genre.reducer';
import voicings from './voice.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  ensembles,  // list of the ensembles for the school
  activeSongs, // songs the selected ensemble is currently singing
  songInfo,
  genreInfo,
  genreList,
  voicings,
});

export default rootReducer;
