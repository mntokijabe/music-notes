const express = require("express");
const pool = require("../modules/pool");
const {
  rejectNonAdmin,
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * POST route template
 */

// This is for adding a genre to a song
router.post("/", rejectNonAdmin, rejectUnauthenticated, (req, res) => {
  const queryText = `
      INSERT INTO genres_songs
          (song_id, genre_id)
          VALUES
          ($1, $2);`;
  queryValues = [Number(req.body.songId), Number(req.body.genreId)];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("error posting new genre", dbErr);
      res.sendStatus(500);
    });
});

/**
 * PUT route
 */

/* This put route is for updating individual pieces of song
info. The genres are done separately
*/
router.put("/", rejectNonAdmin, rejectUnauthenticated, (req, res) => {
  const category = req.body.category;
  let queryText = "";
  let queryValues = [];

  switch (category) {
    case "title":
      queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "composer":
      queryText = `
            UPDATE songs
            SET composer = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "arranger":
      queryText = `
            UPDATE songs
            SET arranged_by = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "voicing":
      queryText = `
            UPDATE songs
            SET voicing_id = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "publisher":
      queryText = `
            UPDATE songs
            SET publisher = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "copyright":
      queryText = `
            UPDATE songs
            SET copyright_year = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "copies":
      queryText = `
            UPDATE songs
            SET quantity = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
    case "url":
      queryText = `
            UPDATE songs
            SET image_url = $1
            WHERE songs.id = $2`;
      queryValues = [req.body.change, Number(req.body.songId)];
      break;
  }
  pool
    .query(queryText, queryValues)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("error editing db ", dbErr);
      res.sendStatus(500);
    });
});

/**
 * DELETE route
 */

// This deletes a genre from a specific song
router.delete("/", rejectNonAdmin, rejectUnauthenticated, (req, res) => {
  const queryText = `
        DELETE FROM genres_songs
        WHERE song_id = $1 AND genre_id = $2;`;
  const queryValues = [req.query.songId, req.query.genreId];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("the delete genre request had an error ", dbErr);
      res.sendStatus(500);
    });
});
module.exports = router;
