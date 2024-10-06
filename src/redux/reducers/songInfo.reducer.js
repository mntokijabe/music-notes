const songInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SONG_INFO":
      return action.payload.data[0];
    case "UNSET_SONG_INFO":
      return [];
    default:
      return state;
  }
};

export default songInfoReducer;
