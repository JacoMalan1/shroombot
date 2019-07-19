const fs = require('fs');

async function callback(sender, args) {

    const fp = fs.readFileSync('assets/facepalm.txt');
    return fp;

}

module.exports = callback;