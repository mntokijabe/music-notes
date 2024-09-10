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
                voicings.name AS voicing, publishers.name, songs.copyright_year, 
                songs.quantity, songs.id
                    FROM songs
                    JOIN voicings
                        ON songs.voicing_id = voicings.id
                    JOIN publishers
                        ON songs.publisher_id = publishers.id
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

            console.log('genreInfo is ',genreInfo)
            let genreArray=[]
            // for (let genre of genreInfo.rows){
            //     genreArray.push(genre.genre_name)
            // }
            const songGenreInfo = [songInfo.rows[0],genreInfo.rows]
        // const queryGenreValues = [req.params.id]
        // pool.query(queryGenreText,queryGenreValues)
        // .then(genreResult => {
        //     genreInfo = genreResult.rows
        // })
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
router.post('/', (req, res) => {
  const queryText = `
    INSERT INTO genres_songs
        (song_id, genre_id)
        VALUES
        ($1, $2);`
    queryValues = [Number(req.body.songId), Number(req.body.genreId)];
    pool.query(queryText, queryValues)
    .then(result => {
        res.sendStatus(200);
   })
   .catch(dbErr => {
    console.log('error posting new genre', dbErr)
    res.sendStatus(500)
   })
});

/**
 * DELETE route 
 */
router.delete('/', (req, res) => {
    console.log('req.params in delete is ', req.query.songId)
    const queryText = `
        DELETE FROM genres_songs
        WHERE song_id = $1 AND genre_id = $2;`
    const queryValues = [req.query.songId, req.query.genreId];
    pool.query(queryText,queryValues)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(dbErr => {
        console.log('the delete genre request had an error ',dbErr)
        res.sendStatus(500)
    })
})

/**
 * PUT route 
 */

router.put('/', (req, res) => {
    const category = req.body.category;
    let queryText = '';
    let queryValues = [];

    switch (category) {
        case 'title':
            queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'composer':
            queryText = `
            UPDATE songs
            SET composer = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'arranger':
            queryText = `
            UPDATE songs
            SET arranged_by = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'voicing':
            queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'title':
            queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'title':
            queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'title':
            queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
        case 'title':
            queryText = `
            UPDATE songs
            SET title = $1
            WHERE songs.id = $2`
            queryValues = [req.body.change, Number(req.body.songId)]
        break;
    }
    pool.query(queryText, queryValues)
    .then(response =>{
        res.sendStatus(200)
    })
    .catch(dbErr => {
        console.log('error editing db ', dbErr)
        res.sendStatus(500)
    })

})


module.exports = router;
