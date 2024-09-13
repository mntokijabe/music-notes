const voiceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VOICINGS':
        return action.payload.data;
      case 'UNSET_VOICINGS':
        return [];
      default:
        return state;
    }
  };
  

  export default voiceReducer;
  