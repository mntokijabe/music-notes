const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmin, rejectUnauthenticated } = require('../modules/authentication-middleware');


// GETS the list of items based upon a particular search category

router.get('/', rejectUnauthenticated, (req, res) => {
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
                    WHERE LOWER (songs.title) LIKE $1
                    ORDER BY songs.title`;
            queryValues = ["%" + data.toLowerCase() +"%"];
                    break;
        case 'composer':   // query for searching by composer
            queryText = `
               SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE LOWER (songs.composer) LIKE $1
                    ORDER BY songs.composer;`;
            queryValues = ["%" + data.toLowerCase() +"%"];
            break;
        case 'arranger':  //query for searching by arranger
            queryText = `
                SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE LOWER (songs.arranged_by) LIKE $1
                    ORDER BY songs.arranged_by`;
            queryValues = ["%" + data.toLowerCase() +"%"];
                    break;
        case 'voicing':   //query for searching by voicing
            queryText = `
                SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity,songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE voicings.id = $1
                    ORDER BY songs.title`;
            queryValues = [data];
            break;
        case 'genre':   // query for searching by genre
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
        case 'ensemble':   // query for searching for songs by ensemble group
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

    pool.query(queryText, queryValues)
    .then(result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting search data',err);
        res.sendStatus(500)
    })
});


module.exports = router;
