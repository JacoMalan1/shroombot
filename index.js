/**
 * The core protocol and function-callback tree
 * of the fungus shroombot.
 * 
 * aka. the init function and main loop
 */

const express = require('express');
const fetch = require('node-fetch');
const Command = require('./command.js');

const app = express();
const commands = [];
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const UPDATE_URL = process.env.UPDATE_URL;

async function sendMethod(name, reqBody) {

    const response = await fetch(`https://api.telegram.org/bot${API_KEY}/${name}`, {

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

function registerCommand(commandNames, commandCallback) {
    commands.push(new Command(commandNames, commandCallback));
}

let updates = [];
function update() {

    // Copy the update qeue to 
    // make room for new updates.
    const cur_updates = updates;
    updates = [];

    for (let item of cur_updates) {

        if (!item.message)
            break;

        if (!item.message.text)
            break;

        const chatID = item.message.chat.id;
        const fromUser = item.message.from;
        const msg = item.message.text;
        const msgID = item.message.message_id;

        if (msg[0] != '/')
            continue;

        const args_list = msg.split(' ');
        let cmdName = args_list[0];
        cmdName = cmdName.substring(1);
        args_list.splice(0, 1);

        if (cmdName.indexOf('@') > -1) {
            cmdName = cmdName.substring(0, cmdName.indexOf('@'));
        }

        console.log(`Got command: ${cmdName}`);

        let handle = null;
        let found = false;

        for (let cmd of commands) {
            for (let name of cmd.names) {
                if (name == cmdName) {

                    handle = cmd;
                    found = true;
                    break;

                }
            }
        }

        if (found) {

            handle.execute(fromUser, args_list).then(commandResponse => {

                console.log(`Sending response: ${commandResponse}`);
                sendMethod('sendMessage', {
                    chat_id: chatID,
                    text: commandResponse,
                    reply_to_message_id: msgID
                }).then(res => {
                    if (!res.ok) {
                        console.error(res.description);
                    }
                })
                    .catch(err => console.log(err));

            }).catch(err => console.error(err));

        } else {

            console.log('Command not found');

        }

    }

}

// Set up app
app.use(express.json());
app.use(express.static('public'));

const encodedKey = encodeURIComponent(API_KEY.replace(':', ''));

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

            fetch(`https://api.telegram.org/bot${API_KEY}/setWebhook?url=${encodedURL}`, {
                method: 'GET',
                headers: {
                    'Accepts': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));

        }

    })
    .catch(err => console.error(err));

sendMethod('getMe', {})
    .then(response => console.log(response))
    .catch(err => console.error(err));

// registerCommand([''], require('./commands/'));
registerCommand(['joke'], require('./commands/joke.js'));
registerCommand(['bt', 'budumtss'], require('./commands/budumtss.js'));
registerCommand(['pun'], require('./commands/pun.js'));
registerCommand(['slap'], require('./commands/slap.js'));
registerCommand(['help'], require('./commands/help.js'));
registerCommand(['kill'], require('./commands/kill.js'));
registerCommand(['define', 'def'], require('./commands/define.js'));
registerCommand(['wikipedia', 'wiki'], require('./commands/wikipedia.js'));
registerCommand(['wolframalpha', 'wolfram', 'wa', 'calc'], require('./commands/wolframalpha.js'));
registerCommand(['urban', 'urbandictionary', 'ud'], require('./commands/urban.js'));
registerCommand(['facepalm'], require('./commands/facepalm.js'));

console.log('Defined commands are: ');
commands.forEach(cmd => console.log(cmd.names));

// Set a timer to process updates every second.
setInterval(update, 1000);