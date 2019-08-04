const Datastore = require('nedb');

async function callback(sender, args, msg, gio) {

    const dbName = `./assets/${msg.chat.id}.db`;
    const db = new Datastore(dbName);

    let response = 'Quote not found!';

    if (args.length < 1) {
        response = 'Not enough arguments!';
        done = true;
    }

    let done = false;
    db.loadDatabase((err) => {

        db.find({ id: args[0] }, (err, docs) => {

            if (docs.length < 1) {

                response = 'Quote not found!';
                done = true;

            } else {

                const quote = docs[0];
                response = `(${quote.id})${quote.user_name}: ${quote.text}`;
                done = true;

            }

        });

    });

    while (!done) { continue; }

    return response;

}

module.exports = callback;