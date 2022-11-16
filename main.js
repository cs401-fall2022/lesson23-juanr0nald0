const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Welcome to Blogster!'));

app.listen(3000, () => console.log('Blogster is up and running... listening on port 3000'));