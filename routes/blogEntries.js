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
        res.send("test of read POST");
    })

// Route /edit is appended to localhost:3000/blogEntries in main.js
router
    .route('/edit')
    .get((req, res) => {
        res.render('blogEntries/edit')
    })
    .post((req, res) => {
        console.log('Edit button works');

        // let postIDNumber = req.body.idnumber;
        // if (req.body.title == null) {
        //     var query = 'UPDATE entries SET blog = ' + req.body.blog + '\' WHERE id = ' + postIDNumber + '\''
        // }        
        
        
        // db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
        res.render('blogEntries/success');
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