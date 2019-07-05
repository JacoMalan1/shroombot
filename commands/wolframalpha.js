const fetch = require('node-fetch');

const wolfram_api_url = `https://api.wolframalpha.com/v1/result?appid=${process.env.WOLFRAM_API_KEY}`;

async function callback(sender, args) {

    let searchString = '';
    args.forEach(arg => searchString += arg + '+');
    searchString = searchString.substring(0, searchString.length - 1);
    searchString = encodeURIComponent(searchString);

    const response = await fetch(wolfram_api_url + `&i=${searchString}`);
    return await response.text();

}

module.exports = callback;