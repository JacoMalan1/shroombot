const Datastore = require('nedb');

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

    let response = 'No quote found for that user!';

    await db.loadDatabase((err) => {

        if (args.length >= 1) {

            db.find({ user_name: args[0] }, (err, docs) => {

                if (docs.length < 1) {

                    response = 'No quote found for that user!';
                    return response;

                } else {

                    response = `Listing ${docs.length} quotes for user ${args[0]}:\n\n`;

                    for (quote of docs) {

                        response += `(${quote.id})${quote.user_name}: ${quote.text}\n\n`;

                    }

                    return response;

                }

            });

        } else {

            db.find({ _id: /.*/ }, (err, docs) => {

                if (docs.length < 1) {

                    response = 'No quote found for that user!';
                    return response;

                } else {

                    response = `Listing ${docs.length} quotes for user ${args[0]}:\n\n`;

                    for (quote of docs) {

                        console.log(quote);
                        response += `(${quote.id})${quote.user_name}: ${quote.text}\n\n`;

                    }

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

        }

    });

    return response;

}

module.exports = callback;