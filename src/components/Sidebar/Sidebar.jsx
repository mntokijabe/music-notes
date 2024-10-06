import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";

function Sidebar() {
  const ensembles = useSelector((store) => store.ensembles);
  const activeSongs = useSelector((store) => store.activeSongs);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [choralGroup, setChoralGroup] = useState();
  const [songId, setSongId] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_ENSEMBLES" });
  }, []);

  const handleSelect = (e) => {
    e.preventDefault();
    setChoralGroup(e.target.value);
    dispatch({ type: "GET_ACTIVE_SONGS", payload: e.target.value });
  };
  const handleDelete = (song) => {
    setSongId(song);
    Swal.fire({
      text: `Do you want to remove this song from this ensemble's list?`,
      position: "top",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed)
        dispatch({
          type: "DELETE_ACTIVE_SONG",
          payload: { ensembleId: choralGroup, songId: song },
        });
    });
  };
  return (
    <>
      {user.id && (
        <Paper
          elevation="8"
          sx={{
            padding: "15px",
            width: 180,
            flexShrink: 0,
            marginLeft: 0,
            marginRight: 2,
            "& .MuiBox-paper": { width: 1800, boxSizing: "border-box" },
            bgcolor: "#dfe0e2",
          }}
        >
          <h3>Select an Ensemble</h3>
          <Select
            sx={{ ml: "15px", width: "100px", ml: "20px", height: "30px" }}
            value={choralGroup}
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            {ensembles.map((ensemble) => (
              <MenuItem key={ensemble.id} value={ensemble.id}>
                {ensemble.name}{" "}
              </MenuItem>
            ))}
          </Select>
          <p></p>

          <List sx={{ mt: "4rem" }}>
            This group is currently singing:
            {activeSongs.map((song) => (
              <ListItem
                key={song.song_id}
                component={Link}
                to={`/info/${song.song_id}`}
              >
                <ListItemText primary={song.title} />
                {user.admin == true && (
                  <Button onClick={() => handleDelete(song.song_id)}>❌</Button>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}

export default Sidebar;
