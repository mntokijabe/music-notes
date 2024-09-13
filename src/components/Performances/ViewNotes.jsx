import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Select, Paper, MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react';
import Swal from 'sweetalert2';


export default function ViewNotes () {
    const params = useParams();
    const songId = params.id;
    const dispatch = useDispatch();
    const notes = useSelector(store => store.notes)
    const ensembles = useSelector(store => store.ensembles)
    const [performDate, setPerformDate] = useState();
    const [eventDescription, setEventDescription] = useState('')
    const [ensemble, setEnsemble] = useState();
    const [performanceNote, setPerformanceNote] = useState('');

    useEffect(() =>{
        dispatch({
            type: 'GET_NOTES', payload: songId
        })
    }, [songId])

    useEffect(() => {
        dispatch({ type: 'GET_ENSEMBLES'})
    },[]);

    const handleSubmit = () => {
        if(performDate === "" || eventDescription === "" || ensemble === "" || performanceNote === "" ) {
        Swal.fire({
            text: `Make sure to enter all the information`,
            position: 'top',
            confirmButtonText: "Ok",
    })}
      else{  dispatch({ type: 'ADD_NOTES', payload: {
            songId: songId,
            date: performDate,
            description: eventDescription,
            ensemble: ensemble,
            note: performanceNote
            }})
        }
    }


    return(
        <Paper sx={{padding:'15px'}}>
            <Box>
            <h2>Past Notes for:  {notes[0]&& notes[0].title} </h2>
            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Performance</td>
                        <td>Ensemble</td>
                        <td style={{width:"300px"}}>Comments</td>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>{note.date}</td>
                            <td>{note.description}</td>
                            <td>{note.name}</td>
                            <td>{note.song_notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </Box>
            <Button sx={{marginTop:"10px", marginLeft:"240px"}}  
                component={Link} to={`/info/${songId}`} variant="contained">Return to Song Info</Button>
            <Box sx={{marginTop:"50px"}}>
                <h2>Add a new Performance Note for: {notes[0]&& notes[0].title}</h2>
                <h4>All values need to be filled in</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <table>
                        <tbody >            
                            <tr > 
                                <td style={{width:'100px'}}>Date:</td>
                                <td> <DatePicker    
                                        selected={performDate}
                                        onChange={(date) => setPerformDate(date)}
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="Select a date"
                                    />
                                </td>
                            </tr>
                            <tr > 
                                <td>Event Description:</td>
                                <td> <input onChange={(e) => setEventDescription(e.target.value)} type="text"  /></td>
                            </tr>
                            <tr> 
                                <td>Ensemble:</td>
                                <td> 
                                    <Select sx={{width:"150px", height:"40px"}}
                                        value={ensemble}
                                        onChange={(e) => setEnsemble(e.target.value)} type="text"
                                    >
                                        {ensembles.map((group) => (
                                        <MenuItem key={group.id} value={group.id} >{group.name} </MenuItem>
                                        ))}
                                    </Select></td>        
                            </tr>
                            <tr> 
                                <td>Song Notes:</td>
                                <td> <textarea 
                                    onChange={(e) => setPerformanceNote(e.target.value)} 
                                    style={{height:'80px', width:'300px', overflowWrap: 'break-word', verticalAlign: 'top'}} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <Box sx={{marginTop:"20px"}}>
                        <h3>Re-check all entries then click Submit
                        <Button type="submit" variant="contained" sx={{marginLeft:"30px"}}>Submit</Button></h3> 
                    </Box>
                </form>


            </Box>
        </Paper>
    )

}