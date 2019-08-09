const fetch = require('node-fetch');
const sendMethod = require('./sendMethod.js');

const wolfram_api_url = `https://api.wolframalpha.com/v1/simple?appid=${process.env.WOLFRAM_API_KEY}`;

async function callback(sender, args, msg) {

    let searchString = '';
    args.forEach(arg => searchString += arg + ' ');
    searchString = searchString.substring(0, searchString.length - 1);
    searchString = encodeURIComponent(searchString);

    while (searchString.indexOf('%20') != -1)
        searchString = searchString.replace('%20', '+');

    console.log(`Query string: ${searchString}`);

    const imageUrl = wolfram_api_url + `&i=${searchString}`;
    const response = await sendMethod('sendPhoto', { chat_id: msg.chat.id, photo: imageUrl });

    if (response.ok) {
        return 'Got image result from Wolfram|Alpha';
    }
    else {
        console.log(response);
        return 'An error occured!';
    }

}

module.exports = callback;