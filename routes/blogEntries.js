const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Placeholder... this is inside blogEntries Route')
})

module.exports = router;