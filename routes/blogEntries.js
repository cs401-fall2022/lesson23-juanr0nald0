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
        // var blogTitle = req.body.title;
        // var blogEntry = req.body.blog;
        let myQueryObject = {
            paramOne: null,
            title: req.body.title,
            blog: req.body.blog,
            dateCreated: new Date().toDateString().replace(/\s/g,''),
        };
    
        var query = 'INSERT INTO entries VALUES(:paramOne, :title, :blog, :dateCreated);';
        
        db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
        res.send("Final test of custom create POST went through!");
    })

// Route /read is appended to localhost:3000/blogEntries in main.js
router
    .route('/read')
    .get((req, res) => {
        // Manual blog entries to test functionality/rendering
        const blogEntries = [{
            title: 'Entry One',
            date: new Date(),
            body: 'Manually creating an entry'
        },
        {
            title: 'Entry Two',
            date: new Date(),
            body: 'Manually creating a second entry'
        }]
        res.render('blogEntries/read', {blogEntries: blogEntries})
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
        res.send("test of edit POST");
    })

// Route /delete is appended to localhost:3000/blogEntries in main.js
router
    .route('/delete')
    .get((req, res) => {
        res.render('blogEntries/delete')
    })
    .post((req, res) => {
        res.send("test of delete POST");
    })


// The router can be accessed from other files
module.exports = router;