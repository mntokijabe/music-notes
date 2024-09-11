const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
  const queryText = `
    SELECT performances_songs.song_notes, TO_CHAR(performances.date, 'MM-DD-YY') AS date, performances.description, ensembles.name, songs.title  FROM performances
      JOIN performances_songs
        ON performances.id = performances_songs.performance_id 
      JOIN songs
        ON songs.id = performances_songs.song_id
      JOIN ensembles
        ON performances_songs.ensemble_id = ensembles.id  
    WHERE songs.id = $1
    ORDER BY performances.date DESC;`

  const queryValues = [req.params.id]
    pool.query(queryText, queryValues)
    .then(result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting notes',err);
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
router.post('/', async (req, res) => {
    const performance = req.body;
    let connection;
    try {
        connection = await pool.connect()
        try {
            const queryPerformanceText = `
            INSERT INTO performances
                (date, description)
                VALUES
                ($1, $2)
                RETURNING id;`
            const queryPerformanceValues = [performance.date, performance.description];
            const queryPerformanceSongText = `
            INSERT INTO performances_songs
                (performance_id, song_id, song_notes, ensemble_id)
                VALUES
                ($1, $2, $3, $4)` 

            const performanceId = await connection.query(queryPerformanceText, queryPerformanceValues)
                const plainId = performanceId.rows[0].id
                const queryPerformanceSongValues = [performanceId.rows[0].id, performance.songId, performance.note, performance.ensemble]  
            await connection.query(queryPerformanceSongText,queryPerformanceSongValues)
             res.sendStatus(200);
           } finally {connection.release()};
    } catch (err){
        console.log('error posting new performance note',err)
        res.sendStatus(500)
    }
  });

module.exports = router;
