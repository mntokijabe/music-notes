import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Select, MenuItem, Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SearchPage() {
  const dispatch = useDispatch()
  const genres = useSelector(store => store.genreList)
  const voicings = useSelector(store => store.voicings)
  const [buttonValue, setButtonValue] = useState('');
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [genre, setGenre] = useState('');
  const [voicing, setVoicing] = useState('');
  const [arranger, setArranger] = useState('');
  const [submissionData, setSubmissionData] = useState({});

  useEffect(() => {
    dispatch({ type: 'GET_GENRES' })
  }, []);
  useEffect(() => {
    dispatch({ type: 'GET_VOICINGS' })
  }, []);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('buttonValue is: ', buttonValue)
    switch (buttonValue) {
      case 'title':
        dispatch({ type: 'SEARCH_THING',
          payload: { category: 'title', data: title },
            history })
        break;
      case 'composer':
        dispatch({ type: 'SEARCH_THING',
          payload: { category: 'composer', data: composer },
            history })        
        break;
      case 'genre':
        dispatch({ type: 'SEARCH_THING', 
          payload: { category: 'genre', data: genre}, 
          history })
        break;
      // axios request, catch data, set global state with that data,
      // const {history} = action.payload
      // history.push('/nextpage')
      case 'arranger':
        dispatch({ type: 'SEARCH_THING',
          payload: { category: 'arranger', data: arranger },
            history })        
        break;
      case 'voicing':
        dispatch({ type: 'SEARCH_THING',
          payload: { category: 'voicing', data: voicing },
            history })        
      break;
    }


  }

  const handleRadioChange = (event) => {
    setButtonValue(event.target.value); // Update the selected value
    console.log(buttonValue)
  };


  return (
    <Paper style={{ flex: 1, padding: 16 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl column>
          <FormLabel id="demo-radio-buttons-group-label"><h2>Search Music Library By</h2></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Title"
            name="radio-buttons-group"
            value={buttonValue} onChange={handleRadioChange}
          >
            <Box sx={{ height: '60px' }}>
              <FormControlLabel value="title" control={<Radio />} label="Title" />
              <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
            </Box>
            <Box sx={{ height: '60px' }}>
              <FormControlLabel value="composer" control={<Radio />} label="Composer" />
              <input className="inputBox" onChange={(e) => setComposer(e.target.value)} type="text" value={composer} />
            </Box>
            <Box sx={{ height: '60px' }}>
              <FormControlLabel value="arranger" control={<Radio />} label="Arranger" />
              <input onChange={(e) => setArranger(e.target.value)} type="text" value={arranger} />
            </Box>
            <Box sx={{ height: '60px' }}>
              <FormControlLabel value="genre" control={<Radio />} label="Genre" />
              <Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)} type="text"
              >
                {genres.map((genre) => (
                  <MenuItem value={genre.id} >{genre.genre_name} </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ height: '60px' }}>
              <FormControlLabel value="voicing" control={<Radio />} label="Voicing" />
              <Select
                value={voicing}
                onChange={(e) => setVoicing(e.target.value)}
              >
                {voicings.map((voice) => (
                  <MenuItem value={voice.id} >{voice.name} </MenuItem>
                ))}
              </Select>
            </Box>
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>





      {/* <Typography variant="h4">Main Content Area</Typography>
      <Typography variant="body1">
        This is where the main content will go.
      </Typography> */}
    </Paper>
  );
}

export default SearchPage;
