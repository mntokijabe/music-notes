import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// the all-powerful search.  Sends a query for 
// a specific category
function* searchThing(action) {
    const category =  action.payload.category
    try{
        const searchResults = yield axios.get('/api/search', 
            {params:{
                category: action.payload.category,
                data: action.payload.data
            }})

        yield put({ type: 'SET_SEARCH_RESULTS', payload: searchResults }) 
        const {history} = action
        history.push(`/search/${category}`)
    }catch (error) {
        console.log('Error getting search results', error)
    }
}

function* search() {
    yield takeLatest('SEARCH_THING', searchThing);
  }
  
  export default search;