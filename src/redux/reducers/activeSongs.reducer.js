const activeSongsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ACTIVE_SONGS":
      return action.payload.data;
    case "UNSET_ACTIVE_SONGS":
      return [];
    default:
      return state;
  }
};

export default activeSongsReducer;
