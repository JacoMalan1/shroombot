const fetch = require('node-fetch');

const urban_api_url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define';

async function callback(sender, args) {

    if (args.length < 1) {
        return 'Not enough arguments!';
    }
    
    let search = '';
    args.forEach(arg => search += arg + ' ');

    search = encodeURIComponent(search);

    const response = await fetch(`${urban_api_url}?term=${search}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': urban_api_url.replace('https://', ''),
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    });

    const data = await response.json();
    const definition = data.list[0];

    if (!definition) {
        return 'No results found!';
    }

    return definition.word + '\n\n' + definition.definition;

}

module.exports = callback;