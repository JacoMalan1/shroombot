const Datastore = require('nedb');
const fs = require('fs');

async function callback(sender, args, msg) {

    const dbName = `${msg.chat.id}.db`;

    if (fs.existsSync(`${dbName}`)) {
        return 'Quote db already created!';
    }

    fs.writeFileSync(`${dbName}`, '');

    return `Database created!\nDebug info:\n    filename: ${dbName}`;

}

module.exports = callback;