const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "ensembles"
        ORDER BY "name";`;

    pool.query(queryText)
    .then(result=> {
        console.log('result of ensembles',result)
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting ensembles',err);
        res.sendStatus(500)
    })
});

router.get('/:id',  async (req, res) => {
    let connection;
    try {
        connection = await pool.connect()
        try {
            const querySongsText = `
                SELECT 
                songs.title, songs.composer, songs.arranged_by, 
                voicings.name AS voicing, songs.publisher, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    WHERE songs.id = $1;`
            
            const queryGenreText = `
                SELECT genre_name, genres.id AS genre_id FROM genres
                    JOIN genres_songs
                        ON genres.id = genres_songs.genre_id
                    JOIN songs
                        ON genres_songs.song_id = songs.id
                    WHERE songs.id = $1`
            const querySongValues = [req.params.id]
            const songInfo = await connection.query(querySongsText, querySongValues)
            const genreInfo = await connection.query(queryGenreText,querySongValues)

            let genreArray=[]

            const songGenreInfo = [songInfo.rows[0],genreInfo.rows]

        res.send(songGenreInfo);
        } finally {connection.release()};
    } catch (err){
        console.log('dbError with song info query',err)
        res.sendStatus(500)
    }
    })



/**
 * POST route 
 */

router.post('/', async(req, res) => {
    const song = req.body;
    let connection;
    try {
        connection = await pool.connect()
        try {
            const querySongText = `
            INSERT INTO songs
                (title, composer, arranged_by, voicing_id, quantity, copyright_year, publisher, image_url)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id;`
            const querySongValues = [song.title, song.composer, song.arranger, Number(song.voicing), Number(song.copyright), Number(song.copies), song.publisher, song.url];
            const queryGenreText = `
            INSERT INTO genres_songs
                (song_id, genre_id)
                VALUES
                ($1, $2)` 

            const newId = await connection.query(querySongText, querySongValues)
                const plainId = newId.rows[0].id
                const queryGenreValues = [newId.rows[0].id, song.genre]  
            await connection.query(queryGenreText,queryGenreValues)
             res.send(newId.rows[0]);
           } finally {connection.release()};
    } catch (err){
        console.log('error posting new song data',err)
        res.sendStatus(500)
    }
  });
/**
 * DELETE route 
 */






module.exports = router;
