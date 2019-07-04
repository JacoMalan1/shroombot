const express = require('express');

const app = express();
const commands = [];

function registerCommand(command) {
    commands.push(command);
}

function update() {
    
}

// Load environment variables
require('dotenv').config();
express.json()

express.static('public');

app.post('/webhooks/update', (req, res) => {



});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const API_KEY = process.env.API_KEY;

let params = JSON.stringify({

    url: 'https://'

});
fetch(`https://api.telegram.org/${API_KEY}/setWebhook`, {
    method: 'POST',
    
    headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
    },

    body: params
});