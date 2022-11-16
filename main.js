const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html')); });

app.post('/message', (req, res) => {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let title = req.body.entryTitle;
    let body = req.body.entryBody;
    let output = `${entryTitle}: ${entryBody}`;

    res.send(output);
});

app.listen(3000, () => console.log('Blogster is up and running... listening on port 3000'));