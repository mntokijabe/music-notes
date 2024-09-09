import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";


function* searchThing(action) {
    console.log('action is ', action.payload.category)
    try{
        const searchResults = yield axios.get('/api/search', 
            {params:{
                category: action.payload.category,
                data: action.payload.data
            }})

        yield put({ type: 'SET_SEARCH_RESULTS', payload: searchResults }) 
        // const {history} = action
        // history.push('/searchresults')
    }catch (error) {
        console.log('Error getting search results', error)
    }
}

function* search() {
    console.log('in search')
    yield takeLatest('SEARCH_THING', searchThing);
  //   yield takeLatest('GET_ACTIVE_SONGS', fetchActiveSongs);
  }
  
  export default search;