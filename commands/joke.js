function callback(sender, args) {

    const api_url = 'https://official-joke-api.appspot.com/random_joke';
    
    let response = '';

    fetch(api_url)
        .then(res => res.json())
        .then(data => response = data.setup + '\n\n' + response.punchline);

    return response;

}

module.exports = callback;