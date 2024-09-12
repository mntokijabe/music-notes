import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Container, Paper } from "@mui/material";


function SongInfo () {
    const params = useParams();
    const songId = params.id;
    const dispatch = useDispatch();
    const songInfo = useSelector(store => store.songInfo);
    const genreInfo = useSelector(store => store.genreInfo)
    const activeEnsemble = useSelector(store => store.activeSongs)
    const user = useSelector(store => store.user)

    useEffect(() =>{
        dispatch({
            type: 'GET_SONG_INFO', payload: songId
        })
    }, [songId])

    let genres = []
    const makeList= () => {
        for (let genre of genreInfo){
            genres.push(genre.genre_name)
        }}
    makeList()
    const handleChange = () => {
        activeEnsemble.length > 0 && addSong()
        
        // (() => {
        //     alert('You are adding this song to the repertoire of the ensemble: '+ activeEnsemble[0].name);
        //     console.log('payload here is', activeEnsemble[0].ensemble_id + songInfo.id)
        //     dispatch({ type: 'ADD_TO_REPERTOIRE', payload:{ensemble: activeEnsemble[0].ensemble_id, song: songInfo.id}})
        // })
        activeEnsemble.length === 0 && alert('You must first select an ensemble in the sidebar')
    };

    function addSong(){
                    alert('You are adding this song to the repertoire of the ensemble: '+ activeEnsemble[0].name);
            console.log('payload here is', activeEnsemble[0].ensemble_id + songInfo.id)
            dispatch({ type: 'ADD_TO_REPERTOIRE', payload:{ensemble_id: activeEnsemble[0].ensemble_id, song_id: Number(songId)}})
        }
    
    return(
        <Container display="flex" sx={{display: 'flex', flexDirection:'row'}}>
        <Box sx={{width:"350px"}}>
            <table>
                <tbody>            
                    <tr style={{height:'60px'}}> <td style={{width:'100px'}}><h2>Title:</h2></td><td style={{width:'200px'}}> <h2>{songInfo.title}</h2></td></tr>
                    <tr style={{height:'30px'}}> <td style={{width:'100px'}}>Composer:</td><td>{songInfo.composer}</td></tr>
                    <tr style={{height:'30px'}}> <td>Arranged by:</td><td>{songInfo.arranged_by}</td></tr>
                    <tr style={{height:'30px'}}> <td>Voicing:</td><td>{songInfo.voicing}</td></tr>
                    <tr style={{height:'30px'}}> <td>Genre:</td><td>{...genres.join(", ")}</td></tr>
                    <tr style={{height:'30px'}}> <td>Publisher:</td><td>{songInfo.publisher}</td></tr>
                    <tr style={{height:'30px'}}> <td>Copyright:</td><td>{songInfo.copyright_year}</td></tr>
                    <tr style={{height:'50px'}}> <td>Copies on Hand:</td><td>{songInfo.quantity}</td></tr>     
                </tbody>
            </table>
            { user.admin === true &&
            <Box sx={{display: 'flex', gap:1, marginTop:"40px"}}>
                <Button component={Link} to={`/edit/${songInfo.id}`} 
                    variant="contained" sx={{width:"100px", textAlign: 'center'}}>Edit Info</Button>
                <Button component={Link} to={`/notes/${songInfo.id}`} 
                    variant="contained" sx={{width:"100px", textAlign: 'center'}}>View or Post Performance Notes</Button>
                <Button onClick={handleChange} 
                    variant="contained" sx={{width:"100px", textAlign: 'center'}}>Add to Repertoire</Button>
            </Box>}
            { user.admin === false &&
            <Button component={Link} to="/user" 
                variant="contained" sx={{width:"150px", textAlign: 'center', mt:"30px", ml:"80px"}}>Return to Search Page </Button>}
        
         
        </Box>
        <Paper sx={{marginLeft:"30px"}}>
            <img src={songInfo.image_url} style={{height:"400px"}}></img>
        </Paper>
        </Container>
    )

}

export default SongInfo;