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

    if (args.length >= 1) {

        const docs = db.collection(colName).where('user_name', '==', args[0]);

        if (docs.length < 1) {

            response = 'No quote found for that user!';
            return response;

        } else {

            response = `Listing ${docs.length} quotes for user ${args[0]}:\n\n`;

            for (quote of docs) {

                response += `(${quote.id}) ${quote.user_name}: ${quote.text}\n\n`;

            }

            return response;

        }

    }

    return null;

}

module.exports = callback;