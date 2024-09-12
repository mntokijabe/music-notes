const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmin, rejectUnauthenticated } = require('../modules/authentication-middleware');


// Gets the list of genres 

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "genres"
        ORDER BY "genre_name";`;

    pool.query(queryText)
    .then(result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('db error getting genres',err);
        res.sendStatus(500)
    })
});


module.exports = router;
