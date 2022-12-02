// Routes directly related to blogEntries
// i.e. "ShowAll" and "Edit"

const express = require('express');
const router = express.Router();

// Route /create is appended to localhost:3000/blogEntries in main.js
router.get('/create', (req, res) => {
    res.render('blogEntries/create')
})

router.post('/', (req, res) => {

})

// The router can be accessed from other files
module.exports = router;