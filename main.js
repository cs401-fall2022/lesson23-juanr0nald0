const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('data/test.db');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Respond with the homepage
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.get('entries')

// Send form data
app.post('/message', (req, res) => {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let title = req.body.entryTitle;
    let body = req.body.entryBody;
    let output = `${entryTitle}: ${entryBody}`;

    res.send(output);
});

app.listen(3000, () => console.log('Blogster is up and running... listening on port 3000'));

// Close the app
process.on('SIGINT', () => {

    db.close((err) => {

        console.log('Blogster is shutting down');

        if (err) {
            console.error(err.message);
        }
          console.log('Securing your blog entries.');
        });

    server.close();
});