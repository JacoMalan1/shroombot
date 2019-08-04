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

    const db = gio.firebaseDB;
    const colName = `${msg.chat.id}_quotes`;

    let response = '';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        return null;
    }

    const query = await db.collection(colName).where('id', '==', parseInt(args[0])).get();
    let docs = [];
    query.forEach(doc => docs.push(doc.data()));

    if (docs.length < 1) {

        response = 'Quote not found!';
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

        const quote = docs[0];
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