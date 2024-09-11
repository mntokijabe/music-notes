
// this reducer stores the list of all genres to be displayed

const genreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GENRES':
        console.log('genre list is ',action.payload.data)
        return action.payload.data;
      case 'UNSET_GENRE':
        return [];
      default:
        return state;
    }
  };
  

  export default genreReducer;
  