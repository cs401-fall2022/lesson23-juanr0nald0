const express = require('express');
const blogRouter = require('./routes/blogEntries');
const app = express();

const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');


const server = http.createServer(app);
const db = new sqlite3.Database(path.resolve(__dirname,'data/blogsterEntries.sqlite')); // We have a persistent database file!



// Part of link for CSS styling and pictures
app.use(express.static(__dirname + '/public'));
// app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/blogEntries', blogRouter);

// Present user with the homepage (index.ejs)
app.get('/', (req, res) => {
    const blogEntries = [{
        title: 'Entry One',
        date: new Date(),
        body: 'Manually creating an entry'
    },
    {
        title: 'Entry Two',
        date: new Date(),
        body: 'Manually creating a second entry'
    }
]
    
    res.render('blogEntries/index', {blogEntries: blogEntries});
});


// Create an entries table if it doesn't exist and add a test entry
db.serialize(function() {
    db.run('DROP TABLE entries');        // Keeping this here for cleanup if necessary
    db.run('CREATE TABLE IF NOT EXISTS entries(id integer PRIMARY KEY, title text(20), blog TEXT(200), dateCreated TEXT(20))');
    
});

// Create a blog entry
function createEntry(titleArg, blogArg) {

    let myQueryObject = {
        paramOne: null,
        title: "Test 2",
        blog: "This is String Number two with a null id",
        dateCreated: new Date().toDateString().replace(/\s/g,''),
    };

    var query = 'INSERT INTO entries VALUES(:paramOne, :title, :blog, :dateCreated);';
    
    db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
}


// function test() {
//     console.log("Button click worked");
// }

// module.exports = {
//     test: test
// }
// var helper = require('./main');

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

// Close the app
process.on('SIGINT', () => {

    db.close((err) => {

        console.log('Blogster is shutting down');

        if (err) {
            console.error(err.message);
            console.log('Error in closing database... trying to secure your blog entries.');
        }          
    });
    console.log('\nBlogster has closed successfully');
    server.close();
    process.exit();
});

// Fire up the server and await input
app.listen(3000, () => console.log('Blogster is up and running... listening on port 3000'));