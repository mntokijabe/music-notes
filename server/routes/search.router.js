const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const {category, data} = req.query;

    let queryText;
    let queryValues = []

    switch (category){
        case 'title':    // query for searching by title
            queryText = `
               SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE LOWER (songs.title) LIKE $1`;
            queryValues = ["%" + data.toLowerCase() +"%"];
                    break;
        case 'composer':
            queryText = `
               SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE LOWER (songs.composer) LIKE $1`;
            queryValues = ["%" + data.toLowerCase() +"%"];
            break;
        case 'arranger':
            queryText = `
                SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE LOWER (songs.arranged_by) LIKE $1`;
            queryValues = ["%" + data.toLowerCase() +"%"];
                    break;
        case 'voicing':
            queryText = `
                SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity,songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE voicings.id = $1`;
            queryValues = [data];
            break;
        case 'genre':
            queryText = `
               SELECT 
                    songs.title, songs.composer, songs.arranged_by, 
                    voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                    songs.quantity, genres.genre_name, songs.id
                        FROM genres
                        JOIN genres_songs
                            ON genres_songs.genre_id = genres.id
                        JOIN songs
                            ON genres_songs.song_id = songs.id
                        JOIN voicings
                            ON songs.voicing_id = voicings.id
                        WHERE genres.id = $1`;
            queryValues = [data];
            break;
        case 'ensemble':
            queryText = `
                SELECT 
                    ensembles.name, songs.title, performances.date, performances.description, 
                    songs.id
                        FROM performances
                        JOIN performances_songs
                            ON performances_songs.performance_id= performances.id 
                        JOIN songs
                            ON songs.id = performances_songs.song_id
                        JOIN ensembles
                            ON performances_songs.ensemble_id = ensembles.id
                        WHERE  ensembles.id = $1;`
            queryValues = [data];
            break;
    }


  
  
    // const queryText = `

    pool.query(queryText, queryValues)
    .then(result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting search data',err);
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
