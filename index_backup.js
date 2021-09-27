const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sampleuser:sampleuser@cluster0.etifr.mongodb.net/vidlyVer1?retryWrites=true&w=majority')
    .then(() => console.log('Connected to vidlyVer1 mongoDB...'))
    .catch(() => console.log('Error in connection with vidlyVer1 mongoDB...'))

const app = express();

const genres = require('./genresWithMongo');

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
