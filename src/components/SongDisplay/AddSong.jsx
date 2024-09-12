import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Select, MenuItem, FormControl } from "@mui/material";

function AddSong () {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genreList)
    const voicings = useSelector(store => store.voicings)


    let [title, setTitle] = useState('')
    let [composer, setComposer] = useState('')
    let [arranger, setArranger] = useState('')
    let [newVoicing, setNewVoicing] = useState('')
    let [genre, setGenre] = useState('')
    let [publisher, setPublisher] = useState('')
    let [copyrightDate, setCopyrightDate] = useState('')
    let [copies, setCopies] = useState('')
    let [url, setUrl] = useState('')


    useEffect(() => {
        dispatch({ type: 'GET_GENRES' })
      }, []);
      useEffect(() => {
        dispatch({ type: 'GET_VOICINGS' })
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title === "" || composer === "" || newVoicing === "" || genre === "" || copies === "") {
            alert('You need to enter all the required information')
        }
        else{
            dispatch({ type: 'ADD_NEW_SONG', payload: {
                title: title,
                composer: composer,
                arranger: arranger,
                voicing: newVoicing,
                genre: genre,
                publisher: publisher,
                copyright: copyrightDate,
                copies: copies,
                url: url
            },history})
        }
    }


    return(
        <Box sx={{ml:5}}>
            <h2>Input a new music piece into the system</h2>
            <h4>Enter the following information</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
            <table>
                <tbody >            
                    <tr className="songInfo" > 
                        <td style={{width:'100px'}}>Title:</td>
                        <td> <input onChange={(e) => setTitle(e.target.value)} type="text" /></td>
                        <td>*required</td>
                    </tr>
                    <tr > 
                        <td>Composer:</td>
                        <td> <input onChange={(e) => setComposer(e.target.value)} type="text"  /></td>
                        <td>*required</td>
                    </tr>
                    <tr> 
                        <td>Arranged by:</td>
                        <td> <input onChange={(e) => setArranger(e.target.value)} type="text"  /></td>
                        <td></td>
                    </tr>
                    <tr> 
                        <td>Voicing:</td>
                        <td> 
                            <Select sx={{width:"150px", height:"40px"}}
                                value={newVoicing}
                                onChange={(e) => setNewVoicing(e.target.value)} type="text"
                            >
                                {voicings.map((voice) => (
                                <MenuItem key={voice.id} value={voice.id} >{voice.name} </MenuItem>
                                ))}
                            </Select></td>
                        <td>*required</td>           
                    </tr>
                    <tr>
                    <td>Add genre</td>
                            <td>
                                <Select sx={{width:"150px", height:"40px"}}
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)} type="text"
                                >
                                    {genres.map((genrelist) => (
                                    <MenuItem key={genrelist.id} value={genrelist.id} >{genrelist.genre_name} </MenuItem>
                                    ))}
                                </Select>
                            </td>
                            <td>*required, more genres can be <br></br>added later using Song Edit   </td>
                    </tr>
                    <tr> 
                        <td>Publisher:</td>
                        <td> <input onChange={(e) => setPublisher(e.target.value)} type="text"  /></td>
                        <td></td>
                    </tr>
                    <tr> 
                        <td>Copyright:</td>
                        <td> <input onChange={(e) => setCopyrightDate(e.target.value)} type="text"  /></td>
                        <td>Enter year</td>
                    </tr>
                    <tr > 
                        <td>Copies on Hand:</td>
                        <td> <input onChange={(e) => setCopies(e.target.value)} type="text"  /></td>
                        <td>*required</td>
                    </tr>  
                    <tr > 
                        <td>Image URL:</td>
                        <td> <input onChange={(e) => setUrl(e.target.value)} type="url"  /></td>
                        <td>URL for image of front page</td>
                    </tr>    
                </tbody>
            </table>
            <Box sx={{marginTop:"20px"}}>
                <h3>Recheck all entries then click Submit 
                <Button type="submit" variant="contained" size="large" sx={{marginLeft:"60px"}}>Submit</Button>
                </h3>
            </Box>
            </form>         
        </Box>
    )
}

export default AddSong;