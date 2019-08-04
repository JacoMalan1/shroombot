const Datastore = require('nedb');
const fs = require('fs');

async function callback(sender, args, msg, gio) {

    const dbName = `./assets/${msg.chat.id}.db`;
    const db = new Datastore({ filename: dbName, inMemoryOnly: false });

    const entry = {

        id: msg.message_id,
        text: gio.last_non_command.text,
        user_name: gio.last_non_command.from.first_name,
        user_id: gio.last_non_command.from.id

    };

    db.loadDatabase((err) => db.insert(entry));

    return `${entry.text}\nGrabbed! (Grab id: ${entry.id})`;

}

module.exports = callback;