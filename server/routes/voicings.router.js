const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GETS the list of voicings

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "voicings"
        ORDER BY "name";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("db error getting voicings", err);
      res.sendStatus(500);
    });
});

module.exports = router;
