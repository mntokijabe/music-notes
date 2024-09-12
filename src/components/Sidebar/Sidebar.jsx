import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Select, MenuItem, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Sidebar() {
    const ensembles = useSelector(store => store.ensembles);
    const activeSongs = useSelector(store => store.activeSongs);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [choralGroup, setChoralGroup] = useState('');
    const [songId, setSongId] = useState('')

    useEffect(() => {
        dispatch({ type: 'GET_ENSEMBLES'})
    },[]);

console.log('active songs are ', activeSongs)
    const handleSelect = (e) => {
        e.preventDefault();
        setChoralGroup(e.target.value) 
        dispatch({ type: 'GET_ACTIVE_SONGS', payload: e.target.value})
    }
    const handleDelete = (song) => {
      // e.preventDefault();
      console.log('songid is',song)
      // console.log('e is' ,e)
      setSongId(song)
      console.log('choralGroup is', choralGroup)
      
      dispatch({ type: 'DELETE_ACTIVE_SONG', payload: {ensembleId: choralGroup, songId: song}})
    }
  return (
    
    <Box
      variant="permanent"
      sx={{padding: "15px",width: 180, flexShrink: 0, marginLeft:-3, marginRight:2, '& .MuiBox-paper': { width: 1800, boxSizing: 'border-box' }, bgcolor:'lightgray'}}
    >
        <h3 >Select Choir</h3>
        <Select sx={{ml:"15px"}}
        value={choralGroup}
        onChange={(e) => {handleSelect(e)}}
        >
        {ensembles.map((ensemble) => (
        <MenuItem key={ensemble.id} value={ensemble.id} >{ensemble.name} </MenuItem>
        ))}
        </Select>
        <p></p>
    

      <List  sx={{mt:'4rem'}}>
        This group is currently singing:
        {activeSongs.map((song) => (
          <ListItem key={song.song_id} component={Link} to={`/info/${song.song_id}`} >
              <ListItemText primary={song.title} /> 
              {user.admin == true && <Button  onClick={() => handleDelete(song.song_id)}>❌</Button>}
          </ListItem>
          ))}
      </List>
    </Box>

  );
}

export default Sidebar;
