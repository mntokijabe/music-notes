import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Select, MenuItem } from "@mui/material";

function SongEdit () {
    const params = useParams();
    const songId = params.id;
    const dispatch = useDispatch();
    const songInfo = useSelector(store => store.songInfo);
    const genreInfo = useSelector(store => store.genreInfo)
    const genres = useSelector(store => store.genreList)

    let [title, setTitle] = useState(songInfo.title)
    let [composer, setComposer] = useState(songInfo.composer)
    let [arranger, setArranger] = useState(songInfo.arranged_by)
    let [voicing, setVoicing] = useState(songInfo.voicing)
    let [genre, setGenre] = useState('')
    let [publisher, setPublisher] = useState(songInfo.name)
    let [copyrightDate, setCopyrightDate] = useState(songInfo.copyright_year)
    let [copies, setCopies] = useState(songInfo.quantity)

    useEffect(() =>{
        dispatch({
            type: 'GET_SONG_INFO', payload: songId
        })
    }, [songId])
    useEffect(() => {
        dispatch({ type: 'GET_GENRES' })
      }, []);

    console.log('songInfo is: ',songInfo)
    console.log('genreInfo is',genreInfo)
    const handleEdit = () => {

    }


    return(
        <Box sx={{ml:5}}>
            <h3>Main Data edits</h3>
            <table>
                <tbody className="songInfo">            
                    <tr className="songInfo" style={{height:'60px'}}> 
                        <td style={{width:'100px'}}>Title:</td>
                        <td> <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} /></td>
                        <td><Button onClick={handleEdit(title)}>Edit</Button></td>
                    </tr>
                    <tr style={{height:'30px'}}> 
                        <td>Composer:</td>
                        <td> <input onChange={(e) => setComposer(e.target.value)} type="text" value={composer} /></td>
                        <td><Button onClick={handleEdit(composer)}>Edit</Button></td>
                    </tr>
                    <tr> 
                        <td>Arranged by:</td>
                        <td> <input onChange={(e) => setArranger(e.target.value)} type="text" value={arranger} /></td>
                        <td><Button onClick={handleEdit(arranger)}>Edit</Button></td>
                    </tr>
                    <tr> 
                        <td>Voicing:</td>
                        <td> <input onChange={(e) => setVoicing(e.target.value)} type="text" value={voicing} /></td>
                        <td><Button onClick={handleEdit(voicing)}>Edit</Button></td>
                    </tr>
                    <tr> 
                        <td>Publisher:</td>
                        <td> <input onChange={(e) => setPublisher(e.target.value)} type="text" value={publisher} /></td>
                        <td><Button onClick={handleEdit(publisher)}>Edit</Button></td>
                    </tr>
                    <tr> 
                        <td>Copyright:</td>
                        <td> <input onChange={(e) => setCopyrightDate(e.target.value)} type="text" value={copyrightDate} /></td>
                        <td><Button onClick={handleEdit(composer)}>Edit</Button></td>
                    </tr>
                    <tr style={{height:'50px'}}> 
                        <td>Copies on Hand:</td>
                        <td> <input onChange={(e) => setCopies(e.target.value)} type="text" value={copies} /></td>
                        <td><Button onClick={handleEdit(copies)}>Edit</Button></td>
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

    )

}

export default SongEdit;