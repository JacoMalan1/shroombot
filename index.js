const express = require('express');
const fetch = require('node-fetch');

const app = express();
const commands = [];

function registerCommand(command) {
    commands.push(command);
}

function update() {
    
}

// Load environment variables
require('dotenv').config();

// Set up app
app.use(express.json());
app.use(express.static('public'));

app.post('/webhooks/update', (req, res) => {

    console.log(req.body);
    res.status(200).end();

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const API_KEY = process.env.API_KEY;
const UPDATE_URL = process.env.UPDATE_URL;

console.log(`Update URL: ${UPDATE_URL}`);

let params = JSON.stringify({

    url: UPDATE_URL

});
fetch(`https://api.telegram.org/${API_KEY}/setWebhook`, {
    method: 'POST',
    
    headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
    },

    body: params
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));