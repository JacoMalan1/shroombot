const fetch = require('node-fetch');
const sendMethod = require('./sendMethod.js');
const uri = 'http://xkcd.com'

async function callback(sender, args, msg) {

    if (args.length <= 0)
        return 'Not enough arguments!';

    const comic_nr = args[0];

    const res = await fetch(`${uri}/${comic_nr}/info.0.json`);
    const json_data = await res.json();

    if (!json_data || !json_data.img)
        return 'Comic not found!';

    const response = await sendMethod('sendPhoto', { chat_id: msg.chat.id, photo: json_data.img });

    if (response.ok) {
        return `xkcd #${args[0]}\nTitle: ${json_data.safe_title}`;
    } else {
        return 'An error occured';
    }

}

module.exports = callback;