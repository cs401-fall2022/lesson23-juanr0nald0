// Routes directly related to blogEntries
// i.e. "ShowAll" and "Edit"

const express = require('express');
let router = express.Router();

// Route /create is appended to localhost:3000/blogEntries in main.js
router
    .route('/create')
    .get((req, res) => {
        res.render('blogEntries/create')
    })
    .post((req, res) => {
        res.send("test of create POST");
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
    .route('/create')
    .get((req, res) => {
        res.render('blogEntries/delete')
    })
    .post((req, res) => {
        res.send("test of delete POST");
    })

// // Function called when a form for a new Blogster entry is submitted from create.ejs
// router.post('/', (req, res) => {
//     let myQueryObject = {
//         paramOne: null,
//         title: "Submit Button Pressed",
//         blog: "This blog came from partial-form-fields.ejs Submit button",
//         dateCreated: new Date().toDateString().replace(/\s/g,''),
//     };

//     var query = 'INSERT INTO entries VALUES(:paramOne, :paramTwo, :paramThree, :paramFour);';
    
//     db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
//     console.log("Query was sent to database!");
// })



// The router can be accessed from other files
module.exports = router;