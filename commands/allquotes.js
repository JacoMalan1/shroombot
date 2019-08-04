const Datastore = require('nedb');

async function callback(sender, args, msg) {

    const dbName = `./assets/${msg.chat.id}.db`;
    const db = new Datastore(dbName);

    let response = 'No quote found for that user!';
    let done = false;

    db.loadDatabase((err) => {

        if (args.length >= 1) {

            db.find({ user_name: args[0] }, (err, docs) => {

                if (docs.length < 1) {

                    response = 'No quote found for that user!';
                    done = true;

                } else {

                    response = `Listing ${docs.length} quotes for user ${args[0]}:\n\n`;

                    for (quote of docs) {

                        response += `(${quote.id})${quote.user_name}: ${quote.text}\n\n`;

                    }

                    done = true;

                }

            });

        } else {

            db.find({ _id: /.*/ }, (err, docs) => {

                if (docs.length < 1) {

                    response = 'No quote found for that user!';
                    done = true;

                } else {

                    response = `Listing ${docs.length} quotes for user ${args[0]}:\n\n`;

                    for (quote of docs) {

                        console.log(quote);
                        response += `(${quote.id})${quote.user_name}: ${quote.text}\n\n`;

                    }

                    done = true;

                }

            });

        }

    });

    while (!done) { continue; }

    return response;

}

module.exports = callback;