const Datastore = require('nedb');

async function callback(sender, args, msg) {

    const dbName = `${msg.chat.id}.db`;
    const db = new Datastore(dbName);

    let response = 'No quote found for that user!';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        return response;
    }

    db.loadDatabase((err) => {

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

    });

    return response;

}

module.exports = callback;