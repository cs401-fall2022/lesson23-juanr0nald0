// Routes directly related to blogEntries
// i.e. "ShowAll" and "Edit"

const express = require('express');
const router = express.Router();

// Route /create is appended to localhost:3000/blogEntries in main.js
router.get('/create', (req, res) => {
    res.render('blogEntries/create')
})

// Function called when a form for a new Blogster entry is submitted from create.ejs
router.post('/', (req, res) => {
    let myQueryObject = {
        paramOne: null,
        title: "Submit Button Pressed",
        blog: "This blog came from partial-form-fields.ejs Submit button",
        dateCreated: new Date().toDateString().replace(/\s/g,''),
    };

    var query = 'INSERT INTO entries VALUES(:paramOne, :paramTwo, :paramThree, :paramFour);';
    
    db.run(query, [myQueryObject.paramOne, myQueryObject.title, myQueryObject.blog, myQueryObject.dateCreated]);
    alert("Query was sent to database!")
})

// The router can be accessed from other files
module.exports = router;