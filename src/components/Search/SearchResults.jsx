
    import { useSelector,useDispatch } from "react-redux";
    import { useEffect } from 'react';
    import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
    import { Box } from "@mui/material";
    
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
    
        console.log('search results are: ',results)
        console.log('category is',category)
    
        return(
            <Box sx={{ml:5}}>
                <table>
                    <tbody>            
                        {/* <tr style={{height:'60px'}}> <td style={{width:'100px'}}><h2>Title:</h2></td><td> <h2>{songInfo.title}</h2></td></tr>
                        <tr style={{height:'30px'}}> <td style={{width:'100px'}}>Composer:</td><td>{songInfo.composer}</td></tr>
                        <tr style={{height:'30px'}}> <td>Arranged by:</td><td>{songInfo.arranged_by}</td></tr>
                        <tr style={{height:'30px'}}> <td>Voicing:</td><td>{songInfo.voicing}</td></tr>
                        <tr style={{height:'30px'}}> <td>Genre:</td><td>{...genreInfo.join(', ')}</td></tr>
                        <tr style={{height:'30px'}}> <td>Publisher:</td><td>{songInfo.name}</td></tr>
                        <tr style={{height:'30px'}}> <td>Copyright:</td><td>{songInfo.copyright_year}</td></tr>
                        <tr style={{height:'50px'}}> <td>Copies on Hand:</td><td>{songInfo.quantity}</td></tr>      */}
                    </tbody>
                </table>
    
                
         
    
            
             
            </Box>
    
        )
    
    }

    export default SearchResults;