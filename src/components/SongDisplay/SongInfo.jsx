import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box } from "@mui/material";

function SongInfo () {
    const params = useParams();
    const songId = params.id;
    const dispatch = useDispatch();
    const songInfo = useSelector(store => store.songInfo);
    const genreInfo = useSelector(store => store.genreInfo)



    useEffect(() =>{
        dispatch({
            type: 'GET_SONG_INFO', payload: songId
        })
    }, [songId])

    console.log('songInfo is: ',songInfo)
    console.log('genreInfo is',genreInfo)

    return(
        <Box sx={{ml:5}}>
            <table>
                <tbody>            
                    <tr style={{height:'60px'}}> <td style={{width:'100px'}}><h2>Title:</h2></td><td> <h2>{songInfo.title}</h2></td></tr>
                    <tr style={{height:'30px'}}> <td style={{width:'100px'}}>Composer:</td><td>{songInfo.composer}</td></tr>
                    <tr style={{height:'30px'}}> <td>Arranged by:</td><td>{songInfo.arranged_by}</td></tr>
                    <tr style={{height:'30px'}}> <td>Voicing:</td><td>{songInfo.voicing}</td></tr>
                    <tr style={{height:'30px'}}> <td>Genre:</td><td>{...genreInfo.join(', ')}</td></tr>
                    <tr style={{height:'30px'}}> <td>Publisher:</td><td>{songInfo.name}</td></tr>
                    <tr style={{height:'30px'}}> <td>Copyright:</td><td>{songInfo.copyright_year}</td></tr>
                    <tr style={{height:'50px'}}> <td>Copies on Hand:</td><td>{songInfo.quantity}</td></tr>     
                </tbody>
            </table>

            
     

        
         
        </Box>

    )

}

export default SongInfo;