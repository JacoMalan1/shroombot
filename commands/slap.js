const fs = require('fs');
const slaps = JSON.parse(fs.readFileSync('./assets/slaps.json')).slaps;

async function callback(sender, args) {
    
    if (args.length < 1) {
        return 'Not enough arguments!';
    }

    const slap = slaps[Math.floor(Math.random() * slaps.length)];
    const victor = sender.first_name;
    const victim = args[0];

    slap = slap.replace('VICTIM', victim).replace('VICTOR', victor);

    return slap;

}

module.exports = callback;