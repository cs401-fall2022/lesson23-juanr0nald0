const express = require("express");
let router = express.Router();

const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const server = http.createServer(app);
let db = new sqlite3.Database(path.resolve(__dirname,'../data/blogsterEntries.sqlite'));



// Route /create is appended to localhost:3000/blogEntries in main.js
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
    
        var query = 'INSERT INTO entries VALUES(:paramOne, :title, :blog, :dateCreated);';
        
        db.run(query, [paramOne, title, blog, dateCreated]);
        res.render('blogEntries/success');
    })

// Route /success is appended to localhost:3000/blogEntries in main.js
router
    .route('/success')
    .get((req, res) => {
        res.render('blogEntries/success');
    })

// Route /read is appended to localhost:3000/blogEntries in main.js
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

        function waitThenRender() {
            res.render('blogEntries/read', {blogEntries: blogEntries});
        }
        
        setTimeout(waitThenRender, 1500);
    })
    .post((req, res) => {

        console.log("You wish to edit Post # " + req.body.editidnumber);
        // var query = "SELECT * FROM entries WHERE id = " + req.body.editidnumber + ";";
        // var result = db.get(query, (err, row) => {
        //     console.log(result);
        // });
        // res.send(result);

        res.render('blogEntries/edit')
    })

// Route /edit is appended to localhost:3000/blogEntries in main.js
router
    .route('/edit')
    .get((req, res) => {
        console.log("I got this via edit GET route " + req.query.editidnumber)
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
            res.render('blogEntries/edit', {currentEntry: currentEntry});
        }        
        setTimeout(waitThenRender, 1500);
    })
    .post((req, res) => {
        var postnumber = req.body.editidnumber;
        console.log("Post's id number is " + postnumber);
        res.render('blogEntries/success')
    })

// Route /delete is appended to localhost:3000/blogEntries in main.js
router
    .route('/delete')
    .get((req, res) => {
        res.render('blogEntries/delete')
    })
    .post((req, res) => {
        let myQueryObject = {
            paramOne: null,
            title: req.body.title,
            blog: req.body.blog,
            dateCreated: new Date().toDateString().replace(/\s/g,''),
        };
    
        var query = 'INSERT INTO entries VALUES(:paramOne, :title, :blog, :dateCreated);';
        
        db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
        res.render('blogEntries/success');
    })

// The router can be accessed from other files
module.exports = router;