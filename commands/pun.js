const fs = require('fs');

async function callback(sender, args) {

    fs.readdir('.', (err, files) => {

        if (err) {
            console.error(err);
        } else {
            console.log(files);
        }

    });

    const fileContents = fs.readFileSync('./puns.json');
    const puns = JSON.parse(fileContents).puns;

    return puns[Math.floor(Math.random() * puns.length)];

}

module.exports = callback;