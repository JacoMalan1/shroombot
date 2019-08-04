const Datastore = require('nedb');
const fs = require('fs');

async function callback(sender, args, msg) {

    console.log('Message: ' + msg);
    const dbName = `./assets/${msg.chat.id}.db`;

    if (fs.existsSync(`${dbName}`)) {
        return 'Quote db already created!';
    }

    const db = new Datastore(dbName);
    db.loadDatabase((err) => {
        db.insert({ id: 0, user_name: 'bot', text: 'First entry', user_id: 0 })
        console.error(err);
    });

    return `Database created!\nDebug info:\n    filename: '${dbName}'`;

}

module.exports = callback;