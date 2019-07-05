const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./assets/config.json'));

async function callback(sender, args) {
    
    const response = `List of commands for ${config.botname}:`;
    const commandList = JSON.parse(fs.readFileSync('./assets/config.json')).commands;

    for (let cmd of commandList)
        response += `/${cmd.name} - ${cmd.description}\n`;

    return response;

}

module.exports = callback;