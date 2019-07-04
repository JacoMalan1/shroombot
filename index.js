const express = require('express');
const fetch = require('node-fetch');

const app = express();
const commands = [];
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const UPDATE_URL = process.env.UPDATE_URL;

async function sendMethod(name, params) {

    const response =  await fetch(`https://api.telegram.org/bot${API_KEY}/${name}`, {

        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        
        body: JSON.stringify(params)

    });

    const jsonData = await response.json();
    return jsonData;

}

function registerCommand(command) {
    commands.push(command);
}

let updates = [];
function update() {

    // Copy the update qeue to 
    // make room for new updates.
    const cur_updates = updates;
    updates = [];

    for (let item of cur_updates) {

        

    }
    
}

// Load environment variables

// Set up app
app.use(express.json());
app.use(express.static('public'));

app.post('/webhooks/update', (req, res) => {

    updates.push(req.body);
    res.status(200).end();

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

console.log(`Update URL: ${UPDATE_URL}`);

let params = JSON.stringify({

    url: UPDATE_URL

});

sendMethod('setWebhook', params)
    .then(res => console.log(res))
    .catch(err => console.error(err));
sendMethod('getMe', {})
    .then(res => console.log(res))
    .catch(err => console.error(err));

setInterval(update, 1000);