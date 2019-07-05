const fetch = require('node-fetch');
const words_api_url = 'https://wordsapiv1.p.rapidapi.com';

async function callback(sender, args) {

    if (args.length < 1) {
        return 'Not enough arguments!';
    }
    
    let search = '';
    args.forEach(arg => search += arg);

    search = encodeURIComponent(search);

    const response = await fetch(`${words_api_url}/words/${search}/definitions`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': words_api_url.replace('https://', ''),
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    });

    const data = await response.json();
    const definitions = data.definitions;

    let result = '';

    if (!definitions) {
        return 'No results found!';
    }

    for (let def of definitions) {

        result += `${search} - ${def.partOfSpeech}:\n\n`;
        result += `${def.definition}\n\n`

    }

    return result;

}

module.exports = callback;