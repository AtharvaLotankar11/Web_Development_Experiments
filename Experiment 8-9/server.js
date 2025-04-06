const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Song = require('./models/Song');  
const connectDB = require('./models/Song');
connectDB();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/submit', async (req, res) => {
    try {
        const newSong = new Song({
            name: req.body.name,
            email: req.body.email,
            songName: req.body.songName,
            artist: req.body.artist,
            genre: req.body.genre
        });
        
        await newSong.save();
        res.redirect('/display');
    } catch (err) {
        console.error('Detailed error:', err);
        res.status(500).render('error', { 
            message: 'Failed to save song',
            error: err.message 
        });
    }
});

app.get('/display', async (req, res) => {
    try {
        const songs = await Song.find().sort({ submissionDate: -1 });
        res.render('display', { songs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving songs');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});