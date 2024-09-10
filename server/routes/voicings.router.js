const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "voicings"
        ORDER BY "name";`;

    pool.query(queryText)
    .then(result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting voicings',err);
        res.sendStatus(500)
    })
});

// router.get('/:id', (req, res) => {
//     const queryText = `
//         SELECT songs.title, active_songs.id FROM songs
//   	        JOIN active_songs
//   		    ON active_songs.song_id = songs.id
//   	        WHERE active_songs.ensemble_id = $1;`
//     const queryValues = [req.params.id]
//     pool.query(queryText, queryValues)
//     .then(result => {
//         res.send(result.rows);
//     }) 
//     .catch(err => {
//         console.log('dbError getting list of active songs ',err)
//         res.sendStatus(500)
//     })
// })


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
