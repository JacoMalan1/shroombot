async function callback(sender, args) {

    const api_url = 'https://official-joke-api.appspot.com/random_joke';

    const res = await fetch(api_url);
    const data = res.json();
    const response = data.setup + '\n\n' + data.punchline;

    return response;

}

module.exports = callback;