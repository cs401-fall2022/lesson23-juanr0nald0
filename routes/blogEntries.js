const express = require("express");
let router = express.Router();

const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const server = http.createServer(app);
let db = new sqlite3.Database(path.resolve(__dirname,'../data/blogsterEntries.sqlite'));

/**
 * Route /create is appended to localhost:3000/blogEntries in main.js. It provides the functionality
 * for adding an entry to the persistent database file by taking in the data from the form and its POST method,
 * creating a date stamp, and crafting all that together into an SQLite3 query. The query is ran and a success
 * page is rendered.
 */
router
    .route('/create')
    .get((req, res) => {
        res.render('blogEntries/create')
    })
    .post((req, res) => {
        var paramOne = null;
        var title = req.body.title;
        var blog = req.body.blog;
        var dateCreated = new Date().toDateString().replace(/\s/g,'');

        //Somewhat sanitize the query by removing single quotes from title and body
        var cleanTitle = title.replace(/'/g, "");
        var cleanBody = blog.replace(/'/g, "");
    
        var query = 'INSERT INTO entries VALUES(:paramOne, :cleanTitle, :cleanBody, :dateCreated);';
        
        db.run(query, [paramOne, title, blog, dateCreated]);
        res.render('blogEntries/success');
    })

/**
 * Route /success is appended to localhost:3000/blogEntries in main.js. It gives confirmation
 * after a succesful Creation, Edit, or Deletion of an entry
 */
router
    .route('/success')
    .get((req, res) => {
        res.render('blogEntries/success');
    })

/**
 * Route /read is appended to localhost:3000/blogEntries in main.js. It creates an array of all
 * the database's entries and pushes the array to the client's browser via GET. POST is unused.
 */
router
    .route('/read')
    .get((req, res) => {
        let blogEntries = [];

        db.each("SELECT id, title, blog, dateCreated FROM entries", function(err, row) {
            var currentEntry = {
                paramOne: row.id,
                title: row.title,
                blog: row.blog,
                dateCreated: row.dateCreated,
            };
            
            blogEntries.push(currentEntry);
            })
        
        // Gives us a chance to create the object from the database return result before rendering
        function waitThenRender() {
            res.render('blogEntries/read', {blogEntries: blogEntries});
        }
        
        setTimeout(waitThenRender, 1500);
    })

/**
 * Route /edit is appended to localhost:3000/blogEntries in main.js. It parses the URL from the client's GET
 * request for an ID number to then query the database, making an object out of the returned result to populate
 * an edit form for the client. Once on the page rendered by the GET method, the POST method takes in the ID
 * number, the title, and the body as string arguments. They are combined into one query and sent to the database.
 */
router
    .route('/edit')
    .get((req, res) => {
        let query = "SELECT id, title, blog, dateCreated FROM entries WHERE id = " + req.query.editidnumber;
        var currentEntry = {};

        db.each(query, function(err, row) {
            currentEntry = {
                paramOne: row.id,
                title: row.title,
                blog: row.blog,
                dateCreated: row.dateCreated,
            };            
        })

        // Gives us a chance to create the object from the database return result before rendering
        function waitThenRender() {
            res.render('blogEntries/edit', {currentEntry: currentEntry});
        }        
        setTimeout(waitThenRender, 1500);
    })
    .post((req, res) => {
        var id = req.body.editidnumber;
        var title = req.body.title;
        var body = req.body.blog;
        
        //Somewhat sanitize the query by removing single quotes from title and body
        var cleanTitle = title.replace(/'/g, "");
        var cleanBody = body.replace(/'/g, "");
        let editQuery = "UPDATE entries SET title = '" +cleanTitle+ "', blog = '" +cleanBody+ "' WHERE id = " +id+ ";"

        db.each(editQuery, function(err, row) {
        })

        // Gives us a chance to create the object from the database return result before rendering
        function waitThenRender() {
            res.render('blogEntries/success');
        }        
        setTimeout(waitThenRender, 1500);
    })

/**
 * Route /delete is appended to localhost:3000/blogEntries in main.js. It parses the URL from the client's GET
 * request for an ID number to then query the database, making an object out of the returned result to populate
 * a "confirm deletion" form for the client. Once on the page rendered by the GET method, the POST method takes in the ID
 * number of the blog entry from the GET method as an argument. It is used to make a deletion query and sent to the database.
 */
router
    .route('/delete')
    .get((req, res) => {
        let query = "SELECT id, title, blog, dateCreated FROM entries WHERE id = " + req.query.editidnumber;
        var currentEntry = {};

        db.each(query, function(err, row) {
            currentEntry = {
                paramOne: row.id,
                title: row.title,
                blog: row.blog,
                dateCreated: row.dateCreated,
            };            
        })

        function waitThenRender() {
            res.render('blogEntries/delete', {currentEntry: currentEntry});
        }        
        setTimeout(waitThenRender, 1500);
    })
    .post((req, res) => {
        var id = req.body.editidnumber;
       
        let deleteQuery = "DELETE FROM entries WHERE id = " +id+ ";"

        db.each(deleteQuery, function(err, row) {
        })

        function waitThenRender() {
            res.render('blogEntries/success');
        }        
        setTimeout(waitThenRender, 1500);
    })

// The router can be accessed from other files
module.exports = router;