const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmin, rejectUnauthenticated } = require('../modules/authentication-middleware');


// Getting the list of ensembles
router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "ensembles"
        ORDER BY "name";`;

    pool.query(queryText)
    .then(result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting ensembles',err);
        res.sendStatus(500)
    })
});
// Gets the list of active songs for a specific ensemble
router.get('/:id', (req, res) => {
    const queryText = `
        SELECT songs.title, active_songs.song_id, ensembles.name, active_songs.ensemble_id FROM songs
  	        JOIN active_songs
  		      ON active_songs.song_id = songs.id
            JOIN ensembles
              ON active_songs.ensemble_id = ensembles.id
  	        WHERE active_songs.ensemble_id = $1;`
    const queryValues = [req.params.id]
    pool.query(queryText, queryValues)
    .then(result => {
        res.send(result.rows);
    }) 
    .catch(err => {
        console.log('dbError getting list of active songs ',err)
        res.sendStatus(500)
    })
})


/**
 * POST route template
 */
// Adds a song to the active list for an ensemble
router.post('/', rejectNonAdmin, rejectUnauthenticated, (req, res) => {
    const queryText = `
        INSERT INTO active_songs
         (ensemble_id, song_id)
         VALUES
         ($1, $2)
         RETURNING ensemble_id;`
    const queryValues = [req.body.ensemble_id, req.body.song_id];
    pool.query (queryText, queryValues)
    .then(ensembleResult => {
        res.send(ensembleResult);
    })
    .catch(err => {
        console.log('error posting to repertoire', err);
        res.sendStatus(500)
    })
});

router.delete('/', rejectNonAdmin, rejectUnauthenticated, (req, res) => {
    console.log('req.params in delete is ', req.query.songId)
    const queryText = `
        DELETE FROM active_songs
        WHERE song_id = $1 AND ensemble_id = $2;`
    const queryValues = [req.query.songId, req.query.ensembleId];
    pool.query(queryText,queryValues)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(dbErr => {
        console.log('the delete active song had an error ',dbErr)
        res.sendStatus(500)
    })
})
module.exports = router;
