import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function* searchThing(action) {
    const category =  action.payload.category
    // const history = useHistory();
    try{
        const searchResults = yield axios.get('/api/search', 
            {params:{
                category: action.payload.category,
                data: action.payload.data
            }})

        yield put({ type: 'SET_SEARCH_RESULTS', payload: searchResults }) 
        // const {history} = action
        // history.push('/search/:category')
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