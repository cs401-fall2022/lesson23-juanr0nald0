// Routes directly related to blogEntries
// i.e. "ShowAll" and "Edit"

const express = require("express");
let router = express.Router();

// Route /create is appended to localhost:3000/blogEntries in main.js
router
    .route('/create')
    .get((req, res) => {
        res.render('blogEntries/create')
    })
    .post((req, res) => {
        // let myQueryObject = {
        //     paramOne: null,
        //     title: "POST form test from create.ejs",
        //     blog: "This string is hardcoded in blogEntries.js to test",
        //     dateCreated: new Date().toDateString().replace(/\s/g,''),
        // };
    
        // var query = 'INSERT INTO entries VALUES(:paramOne, :title, :blog, :dateCreated);';
        
        // db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
        res.send("test of create POST went through! Print test submission: " + req.params.title + req.params.blog);
    })

// Route /read is appended to localhost:3000/blogEntries in main.js
router
    .route('/read')
    .get((req, res) => {
        res.render('blogEntries/read')
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