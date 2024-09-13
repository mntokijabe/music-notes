const ensemblesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ENSEMBLES':
        return action.payload;
      case 'UNSET_ENSEMBLES':
        return [];
      default:
        return state;
    }
  };
  

  export default ensemblesReducer;
  