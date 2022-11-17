const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database('data/blogsterEntries.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the blogsterEntries SQLite3 database.')
});

// Express module code... >>>>>>>>>>>>>>>>>>>>>> MAY NEED
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

// Fire up the database
// db.run

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
          console.log('Error in closing database... trying to secure your blog entries.');
        });
    
    server.close();
    console.log('Blogster has closed successfully');
    process.exit();
});
