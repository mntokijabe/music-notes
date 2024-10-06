const searchReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      let searchResults = action.payload.data;
      return searchResults;
    case "UNSET_SEARCH_RESULTS":
      return [];
    default:
      return state;
  }
};

export default searchReducer;
