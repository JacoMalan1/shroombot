const Datastore = require('nedb');
const fs = require('fs');

async function callback(sender, args, msg) {

    // const dbName = `./assets/${msg.chat.id}.db`;
    const dbName = 'test.db';

    if (fs.existsSync(`${dbName}`)) {
        return 'Quote db already created!';
    }

    fs.writeFileSync(dbName, '{}');

    return `Database created!\nDebug info:\n    filename: '${dbName}'`;

}

module.exports = callback;