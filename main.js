const express = require('express');
const path = require('path');       // Is this still necessary?
const sqlite3 = require('sqlite3').verbose();
const http = require('http');

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database(path.resolve(__dirname,'data/blogsterEntries.sqlite')); // We have a persistent database file!

// Express module code... >>>>>>>>>>>>>>>>>>>>>> MAY NEED
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

// Fire up the database and create an entries table
db.serialize(function() {
    db.run('DROP TABLE entries');
    db.run('CREATE TABLE IF NOT EXISTS entries(id integer PRIMARY KEY, title text(20), body TEXT(200), currentDate TEXT(20))');
    var currentDate = new Date().toDateString().replace(/\s/g,'');

    let myQueryObject = {
        paramOne: null,
        paramTwo: "I can't believe it",
        paramThree: "I think I got this working, date too",
        paramFour: currentDate
    };

    var query = 'INSERT INTO entries VALUES(:paramOne, :paramTwo, :paramThree, :paramFour);';
    // var stringOne = "I hope this works";
    // var stringTwo = "Oh man, I think it might work";
    // db.run('INSERT INTO entries (title, body, currentDate) VALUES(@title, @body, @currentDate)', {stringOne, stringTwo, date});
    db.run(query, [myQueryObject.paramOne, myQueryObject.paramTwo, myQueryObject.paramThree, myQueryObject.paramFour]);
});

// Respond with the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// // Create a blog entry
// app.get('/', (req, res) => {
//     db.serialize(() => {
//         db.run('INSERT INTO entries(id, title, body, currentDate) VALUES(?,?,?,?)', [req.params.id, req.params.title, req.params.body, req.params.currentDate], function(err) {
//             if (err) {
//                 return console.log(err.message);
//             }
//             console.log("New blog entry added successfully!");
//             res.send("New blog entry has been added to the database");
//         });
//     });
// });

// Send form data
app.post('/message', (req, res) => {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let title = req.body.entryTitle;
    let body = req.body.entryBody;
    let timeStamp = new Date();
    let output = `${entryTitle}: ${entryBody}: ${timeStamp}`;

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
