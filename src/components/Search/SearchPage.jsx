import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchPage() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genreList);
  const voicings = useSelector((store) => store.voicings);
  const [buttonValue, setButtonValue] = useState("");
  const [title, setTitle] = useState("");
  const [composer, setComposer] = useState("");
  const [genre, setGenre] = useState("");
  const [voicing, setVoicing] = useState("");
  const [arranger, setArranger] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_GENRES" });
  }, []);
  useEffect(() => {
    dispatch({ type: "GET_VOICINGS" });
  }, []);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (buttonValue) {
      case "title":
        dispatch({
          type: "SEARCH_THING",
          payload: { category: "title", data: title },
          history,
        });
        break;
      case "composer":
        dispatch({
          type: "SEARCH_THING",
          payload: { category: "composer", data: composer },
          history,
        });
        break;
      case "genre":
        dispatch({
          type: "SEARCH_THING",
          payload: { category: "genre", data: genre },
          history,
        });
        break;
      case "arranger":
        dispatch({
          type: "SEARCH_THING",
          payload: { category: "arranger", data: arranger },
          history,
        });
        break;
      case "voicing":
        dispatch({
          type: "SEARCH_THING",
          payload: { category: "voicing", data: voicing },
          history,
        });
        break;
    }
  };

  const handleRadioChange = (event) => {
    setButtonValue(event.target.value); // Update the selected radio button value
  };

  return (
    <Paper elevation="0" style={{ flex: 1, padding: 16 }}>
      <h1>Welcome!</h1>
      <div style={{ width: "350px", textWrap: "wrap" }}>
        This is the place to start your Music Library search.
        <li>Select a radio button and enter the search value</li>
        <li>Only one search criteria can be used at a time</li>
      </div>
      <br></br>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl column>
          <FormLabel id="demo-radio-buttons-group-label">
            <h2>Search Music Library By</h2>
          </FormLabel>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Title"
            name="radio-buttons-group"
            value={buttonValue}
            onChange={handleRadioChange}
          >
            <Box sx={{ height: "60px" }}>
              <FormControlLabel
                value="title"
                control={<Radio />}
                label="Title"
              />
              <input
                style={{ marginLeft: "42px" }}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setButtonValue("title");
                }}
                type="text"
                value={title}
              />
            </Box>
            <Box sx={{ height: "60px" }}>
              <FormControlLabel
                value="composer"
                control={<Radio />}
                label="Composer"
              />
              <input
                style={{ marginLeft: "9px" }}
                onChange={(e) => {
                  setComposer(e.target.value);
                  setButtonValue("composer");
                }}
                type="text"
                value={composer}
              />
            </Box>
            <Box sx={{ height: "60px" }}>
              <FormControlLabel
                value="arranger"
                control={<Radio />}
                label="Arranger"
              />
              <input
                style={{ marginLeft: "18px" }}
                onChange={(e) => {
                  setArranger(e.target.value), setButtonValue("arranger");
                }}
                type="text"
                value={arranger}
              />
            </Box>
            <Box sx={{ height: "60px" }}>
              <FormControlLabel
                value="genre"
                control={<Radio />}
                label="Genre"
              />
              <Select
                sx={{ width: "180px", ml: "31px", height: "30px" }}
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value), setButtonValue("genre");
                }}
                type="text"
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.genre_name}{" "}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ height: "60px" }}>
              <FormControlLabel
                value="voicing"
                control={<Radio />}
                label="Voicing"
              />
              <Select
                sx={{ width: "180px", ml: "25px", height: "30px" }}
                value={voicing}
                onChange={(e) => {
                  setVoicing(e.target.value), setButtonValue("voicing");
                }}
              >
                {voicings.map((voice) => (
                  <MenuItem key={voice.id} value={voice.id}>
                    {voice.name}{" "}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: "15px", ml: "120px", width: "100px" }}
          >
            Submit Search
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default SearchPage;
