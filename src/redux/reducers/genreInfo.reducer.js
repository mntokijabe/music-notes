// this reducer gets the genres of a specific cong

const genreInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SONG_INFO":
      return action.payload.data[1]; //payload has two objects, second object is genreInfo
    case "UNSET_SONG_INFO":
      return [];
    default:
      return state;
  }
};

export default genreInfoReducer;
