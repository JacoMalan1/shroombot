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

async function callback(sender, args, msg, gio) {

    const colName = `${msg.chat.id}_quotes`;
    const db = gio.firebaseDB;

    let response = 'Stand by...';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        return response;
    }

    const docs = await db.collection(colName).where('user_name', '==', args[0]);

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

    return null;

}

module.exports = callback;