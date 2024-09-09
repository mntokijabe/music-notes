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

    useEffect(() => {
        dispatch({ type: 'GET_ENSEMBLES'})
    },[]);


console.log('the ensembles are', ensembles)
    const handleSelect = (e) => {
        e.preventDefault();
        setChoralGroup(e.target.value) 
        dispatch({ type: 'GET_ACTIVE_SONGS', payload: e.target.value})
    }

  return (
    
    <Box
      variant="permanent"
      sx={{width: 180, flexShrink: 0, marginLeft:-3, marginRight:2, '& .MuiBox-paper': { width: 1800, boxSizing: 'border-box' }, bgcolor:'lightgray'}}
    >
        <h3>Select Choir</h3>
        <Select
        value={choralGroup}
        onChange={(e) => {handleSelect(e)}}
        >
        {ensembles.map((ensemble) => (
        <MenuItem value={ensemble.id} >{ensemble.name} </MenuItem>
        ))}
        </Select>
        <p></p>
    

      <List  sx={{mt:'4rem'}}>
        This group is currently singing:
      {activeSongs.map((song) => (
        <ListItem key={song.id} component={Link} to={`/info/${song.id}`} >
            <ListItemText primary={song.title} />
        </ListItem>
        ))}
      </List>
    </Box>

  );
}

export default Sidebar;
