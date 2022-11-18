const express = require('express');
const path = require('path');       // Is this still necessary?
const sqlite3 = require('sqlite3').verbose();
const http = require('http');

const app = express();
const server = http.createServer(app);
// var db = new sqlite3.Database('/data/blogsterEntries.db', sqlite3.OPEN_READWRITE, (err) => {   // Trying ':memory:', instead of the db file because of error code: 'SQLITE_NOTADB'
var db = new sqlite3.Database(path.resolve(__dirname,'data/blogsterEntries.sqlite')
);

// Express module code... >>>>>>>>>>>>>>>>>>>>>> MAY NEED
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

// Fire up the database
db.run('CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY, title TEXT, body TEXT, currentDate TEXT)');

// Respond with the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a blog entry
app.get('/', (req, res) => {
    db.serialize(() => {
        db.run('INSERT INTO entries(id, title, body, currentDate) VALUES(?,?,?,?)', [req.params.id, req.params.title, req.params.body, req.params.currentDate], function(err) {
            if (err) {
                return console.log(err.message);
            }
            console.log("New blog entry added successfully!");
            res.send("New blog entry has been added to the database");
        });
    });
});

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
            console.log('Error in closing database... trying to secure your blog entries.');
        }          
    });
    console.log('Blogster has closed successfully');
    server.close();
    process.exit();
});
