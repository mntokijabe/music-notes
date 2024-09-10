const voiceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VOICINGS':
        console.log('voice list is ',action.payload.data)
        return action.payload.data;
      case 'UNSET_VOICINGS':
        return [];
      default:
        return state;
    }
  };
  

  export default voiceReducer;
  