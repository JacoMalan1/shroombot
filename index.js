const express = require('express');
const fetch = require('node-fetch');

const app = express();
const commands = [];
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const UPDATE_URL = process.env.UPDATE_URL;

async function sendMethod(name, reqBody) {

    const response =  await fetch(`https://api.telegram.org/bot${API_KEY}/${name}`, {

        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        
        body: reqBody

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

        const chatID = item.message.chat.id;
        const msg = 'You said: ' + item.message.text;

        sendMethod('sendMessage', { chat_id: chatID, text: msg })
            .then(res => console.log(res))
            .catch(err => console.error(err));

    }
    
}

// Load environment variables

// Set up app
app.use(express.json());
app.use(express.static('public'));

const encodedKey = encodeURIComponent(API_KEY);

app.post(`/webhooks/${encodedKey}`, (req, res) => {

    console.log('Got update!');
    console.log(req.body);
    updates.push(req.body);
    res.status(200).end();

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const encodedURL = UPDATE_URL + `/${encodedKey}`;
let params = JSON.stringify({ url: encodedURL, allowed_updates: [] });

console.log(`Update URL: ${encodedURL}`);

sendMethod('getWebhookInfo', {})
    .then((response) => {

        console.log(response);
        if (response.result.url == '') {
            sendMethod('setWebhook', params)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        }

    })
    .catch(err => console.error(err));

sendMethod('getMe', {})
    .then(response => console.log(response))
    .catch(err => console.error(err));

setInterval(update, 1000);