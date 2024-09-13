
    import { useSelector,useDispatch } from "react-redux";
    import { useEffect } from 'react';
    import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
    import { Box } from "@mui/material";
    import SearchTitle from "./SearchTitle";
    import SearchComposer from "./SearchComposer.jsx";
    import SearchArranger from "./SearchArranger.jsx";
    import SearchVoicing from "./SearchVoicing.jsx";
    import SearchGenre from "./SearchGenre.jsx";
    
    function SearchResults () {
        const params = useParams();
        const category = params.id;
        const dispatch = useDispatch();
        const results = useSelector(store => store.searchResults);


    
        useEffect(() =>{
            dispatch({
                type: 'GET_SEARCH_RESULTS'
            })
        }, [])
    
    
        return(
            <Box sx={{ml:5}}>
                {category === 'title' && <SearchTitle />}
                {category === 'composer' && <SearchComposer />}
                {category === 'arranger' && <SearchArranger />}
                {category === 'genre' && <SearchGenre />}
                {category === 'voicing' && <SearchVoicing />}            
             
            </Box>
    
        )
    
    }

    export default SearchResults;