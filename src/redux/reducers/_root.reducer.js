import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import ensembles from "./ensembles.reducer";
import activeSongs from "./activeSongs.reducer";
import songInfo from "./songInfo.reducer";
import genreInfo from "./genreInfo.reducer";
import genreList from "./genre.reducer";
import voicings from "./voice.reducer";
import searchResults from "./search.reducer";
import notes from "./notes.reducer";

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  ensembles, // list of the ensembles for the school
  activeSongs, // songs the selected ensemble is currently singing
  songInfo,
  genreInfo, // gets the genres of a specific song
  genreList, // gets the list of all genres
  voicings,
  searchResults,
  notes,
});

export default rootReducer;
