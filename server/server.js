const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const ensemblesRouter = require('./routes/ensembles.router');
const songsRouter = require('./routes/songs.router');
const genresRouter = require('./routes/genres.router');
const voicingRouter = require('./routes/voicings.router');
const searchRouter = require('./routes/search.router')
const editsRouter = require('./routes/edits.router');
const notesRouter = require('./routes/notes.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/ensembles', ensemblesRouter);
app.use('/api/songs', songsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/voicings', voicingRouter)
app.use('/api/search', searchRouter);
app.use('/api/edits', editsRouter);
app.use('/api/notes', notesRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
