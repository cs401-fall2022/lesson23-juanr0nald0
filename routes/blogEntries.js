const express = require('express');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('blogEntries/create')
})

router.post('/', (req, res) => {

})

module.exports = router;