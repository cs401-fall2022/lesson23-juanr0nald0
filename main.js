const express = require('express');
const blogRouter = require('./routes/blogEntries.js'); // Can access the router exported in blogEntries.js
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const server = http.createServer(app);
let db = new sqlite3.Database(path.resolve(__dirname,'data/blogsterEntries.sqlite')); // We have a persistent database file!


// Part of link for CSS styling and pictures
app.use(express.static(__dirname + '/public'));

// Used to parse req data for form submissions
app.use(express.urlencoded({ extended: true }));

// Views are being written in ejs
app.set('view engine', 'ejs');

/**
 * Blogster is using the router exported from blogEntries.js. This sets the router/index at localhost:3000/blogEntries.
 * "Use the blogEntries.js file to handle endpoints that start with /blogEntries"
 */
app.use('/blogEntries', blogRouter);

// Present user with the homepage (index.ejs)
app.get('/', (req, res) => {
    res.render('blogEntries/index');
});


// Create an entries table if it doesn't exist
db.serialize(function() {
    // db.run('DROP TABLE entries');        // Keeping this here for cleanup if necessary
    db.run('CREATE TABLE IF NOT EXISTS entries(id integer PRIMARY KEY, title TEXT(20), blog TEXT(200), dateCreated TEXT(20))');    
});

// Close the app
function shutDownBlogster() {
    console.log('\nThanks for using Blogster!');
    db.close();
    server.close();
    process.exit();
}
process.on('SIGINT', shutDownBlogster);
process.on('SIGTERM', shutDownBlogster);
process.on('SIGQUIT', shutDownBlogster);

// Fire up the server and await input
app.listen(3000, () => console.log('Blogster is up and running... listening on port 3000'));

module.exports = db;