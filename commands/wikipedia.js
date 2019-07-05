const fetch = require('node-fetch');

const wiki_api_url = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

async function callback(sender, args) {

    if (args.length < 1) {
        return 'Not enough arguments!';
    }

    let searchString = '';
    args.forEach(arg => searchString += arg + '_');
    searchString = searchString.replace(' ', '_'); // Can never be too safe.
    searchString = searchString.substring(0, searchString.length - 1); // Chop of the last _

    console.log(`Query string: ${searchString}`);

    const response = await fetch(wiki_api_url + searchString, {

        method: 'GET',
        header: {
            'Accepts': 'application/json'
        }

    });

    const data = await response.json();
    const title = data.title;
    const summary = data.extract;

    let result = title + '\n\n' + summary;

    return result;

}

module.exports = callback;