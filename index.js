const express = require('express');
const fetch = require('node-fetch');
const Command = require('./command.js');

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
        
        body: JSON.stringify(reqBody)

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
        const fromUsername = item.message.from.username;
        const msg = item.message.text;

        if (msg[0] != '/')
            continue;

        const args_list = msg.split(' ');
        const command = args_list[0];
        command.substring(1);
        args_list.splice(0, 1);

        let response = '';
        for (let cmd of commands) {
            for (let alias of cmd.aliases) {
                if (alias == command) {
                    response = cmd.execute(fromUsername, args_list);
                }
            }
        }

        sendMethod('sendMessage', { chat_id: chatID, text: response })
            .then(res => {
                if (!res.ok) {
                    console.error(res.description);
                }
            })
            .catch(err => console.log(err));

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

commands.push(new Command(['joke'], require('./commands/joke.js')));

setInterval(update, 1000);