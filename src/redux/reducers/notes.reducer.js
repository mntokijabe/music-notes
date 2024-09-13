const notesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTES':
          return action.payload.data;
        case 'UNSET_NOTES':
          return [];
        default:
          return state;
      }
    };


export default notesReducer;