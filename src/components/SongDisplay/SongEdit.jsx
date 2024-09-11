import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Select, MenuItem, Container, Paper } from "@mui/material";

function SongEdit () {
    const params = useParams();
    const songId = params.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const songInfo = useSelector(store => store.songInfo);
    const genreInfo = useSelector(store => store.genreInfo)
    const genres = useSelector(store => store.genreList)
    const voicings = useSelector(store => store.voicings)


    let [title, setTitle] = useState(songInfo.title)
    let [composer, setComposer] = useState(songInfo.composer)
    let [arranger, setArranger] = useState(songInfo.arranged_by)
    let [newVoicing, setNewVoicing] = useState('')
    let [genre, setGenre] = useState('')
    let [publisher, setPublisher] = useState(songInfo.publisher)
    let [copyrightDate, setCopyrightDate] = useState(songInfo.copyright_year)
    let [copies, setCopies] = useState(songInfo.quantity)
    let [url, setUrl]= useState(songInfo.image_url)

    useEffect(() =>{
        dispatch({
            type: 'GET_SONG_INFO', payload: songId
        })
    }, [songId])
    useEffect(() => {
        dispatch({ type: 'GET_GENRES' })
      }, []);
      useEffect(() => {
        dispatch({ type: 'GET_VOICINGS' })
      }, []);

    console.log('songInfo is: ',songInfo)
    console.log('genreInfo is',genreInfo)
    const handleEdit = (category) => {
        switch (category) {
            case 'title':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: title}, history})
                break;
            case 'composer':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: composer}, history})
                break;
            case 'arranger':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: arranger}, history})
                break;
            case 'voicing':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: newVoicing}, history})
                break;
            case 'publisher':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: publisher}, history})
                break;
            case 'copyright':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: copyrightDate}, history})
                break;
            case 'copies':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: copies}, history})
                break;
            case 'url':
                dispatch({ type: 'EDIT_SONG', payload: {category: category, songId: songId, change: url}, history})
                break;
        }
    }

    const handleDelete = (genreId) => {
        console.log('in handleDelete')
        dispatch({ type: 'DELETE_SONG_GENRE', payload: {songId: songId, genreId: genreId}})
    }
    const handleAdd = (genreId) => {
        console.log('in handleAdd')
        genre === '' && alert("you must choose a genre from the dropdown")
        !genre =='' && dispatch({ type: 'ADD_SONG_GENRE', payload: {songId: songId, genreId: genre}})
    }

    return(
        <Container display="flex" sx={{display: 'flex', flexDirection:'row'}}>
        <Box >
            <h3>Main Data edits</h3>
            <h4>Make desired change, then click Submit</h4>
            <table>
                <tbody className="songInfo">            
                    <tr className="songInfo" style={{height:'60px'}}> 
                        <td style={{width:'100px'}}>Title:</td>
                        <td> <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} /></td>
                        <td><Button onClick={() => handleEdit("title")}>Submit</Button></td>
                    </tr>
                    <tr > 
                        <td>Composer:</td>
                        <td> <input onChange={(e) => setComposer(e.target.value)} type="text" value={composer} /></td>
                        <td><Button onClick={() => handleEdit("composer")}>Submit</Button></td>
                    </tr>
                    <tr> 
                        <td>Arranged by:</td>
                        <td> <input onChange={(e) => setArranger(e.target.value)} type="text" value={arranger} /></td>
                        <td><Button onClick={() => handleEdit("arranger")}>Submit</Button></td>
                    </tr>
                    <tr> 
                        <td>Voicing:</td>
                        <td> <Select sx={{width:"100px", marginRight:"20px"}}
                        value={newVoicing}
                        onChange={(e) => setNewVoicing(e.target.value)}
                    >
                        {voicings.map((voice) => (
                        <MenuItem key={voice.id} value={voice.id} >{voice.name} </MenuItem>
                        ))}
                    </Select> Currently {songInfo.voicing}</td>
                        <td><Button onClick={() => handleEdit("voicing")}>Submit</Button></td>
                                
                    </tr>
                    <tr> 
                        <td>Publisher:</td>
                        <td> <input onChange={(e) => setPublisher(e.target.value)} type="text" value={publisher} /></td>
                        <td><Button onClick={() => handleEdit("publisher")}>Submit</Button></td>
                    </tr>
                    <tr> 
                        <td>Copyright:</td>
                        <td> <input onChange={(e) => setCopyrightDate(e.target.value)} type="text" value={copyrightDate} /></td>
                        <td><Button onClick={() => handleEdit("copyright")}>Submit</Button></td>
                    </tr>
                    <tr > 
                        <td>Copies on Hand:</td>
                        <td> <input onChange={(e) => setCopies(e.target.value)} type="text" value={copies} /></td>
                        <td><Button onClick={() => handleEdit("copies")}>Submit</Button></td>
                    </tr>     
                </tbody>
            </table>
            <Box>
                <h3> Genre Edits </h3>
                    <table>
                        <tbody>

                            {genreInfo.map((thisgenre) => (
                             <tr>                               
                                <td>{thisgenre.genre_name}</td>
                                <td><Button onClick={() => handleDelete(thisgenre.genre_id)} >delete</Button></td>
                            </tr>                         
                            ))}
                            <tr><td>Add genre</td>
                            <td>
                                <Select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)} type="text"
                                >
                                    {genres.map((genrelist) => (
                                    <MenuItem value={genrelist.id} >{genrelist.genre_name} </MenuItem>
                                    ))}
                                </Select>
                            </td>
                            <td><Button onClick={() => handleAdd()}>Submit</Button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                
            </Box>         
        </Box>

        <Paper elevation='0' sx={{marginLeft:"30px", justifyContent:"center"}}>
            Image URL: <input onChange={(e) => setUrl(e.target.value)} type="text" value={url} />
            <br></br>
            <Button onClick={() => handleEdit("url")} variant="outlined" >Submit</Button>
            <p></p>
            <Paper sx={{justifyContent:"center"}}>
                <img src={songInfo.image_url} style={{height:"300px"}}></img>
            </Paper>
            <Button sx={{marginTop:"150px"}}  component={Link} to={`/info/${songId}`} variant="contained">Cancel Editing</Button>
        </Paper>
       </Container> 
    )

}

export default SongEdit;