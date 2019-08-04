const Datastore = require('nedb');
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

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

async function callback(sender, args, msg) {

    const dbName = `./assets/${msg.chat.id}.db`;
    const db = new Datastore({ filename: dbName, inMemoryOnly: false });

    let response = 'Stand by...';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        return response;
    }

    let done = false;
    await db.loadDatabase((err) => {

        db.find({ user_name: args[0] }, (err, docs) => {

            if (docs.length < 1) {

                response = 'No quote found for that user!';
                console.log(`Sending response: ${response}`);
                sendMethod('sendMessage', {
                    chat_id: msg.chat.id,
                    text: response,
                    reply_to_message_id: msg.message_id
                }).then(res => {
                    if (!res.ok) {
                        console.error(res.description);
                    }
                }).catch(err => console.log(err));

            } else {

                const quote = docs[Math.floor(Math.random() * docs.length)];
                response = `(${quote.id})${quote.user_name}: ${quote.text}`;
                console.log(`Sending response: ${response}`);
                sendMethod('sendMessage', {
                    chat_id: msg.chat.id,
                    text: response,
                    reply_to_message_id: msg.message_id
                }).then(res => {
                    if (!res.ok) {
                        console.error(res.description);
                    }
                }).catch(err => console.log(err));

            }

        });

    });

    return null;

}

module.exports = callback;