const fetch = require('node-fetch');
const GT_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

const GT_API_URL = `https://translation.googleapis.com/language/translate/v2?key=${GT_API_KEY}`;

async function callback(sender, args) {

    if (args.length < 1)
        return 'Not enough arguments given!';

    let str = '';

    args.forEach(arg => str += arg + ' ');
    str = str.substring(0, str.length - 1);

    const responseRaw = await fetch(GT_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            q: str,
            target: 'en'
        })
    });

    const responseJSON = await responseRaw.json();
    if (responseJSON.error)
        return 'An error occurred!';

    let translation = responseJSON.data.translations[0].translatedText;
    while (translation.indexOf('&#39;') != -1)
        translation = translation.replace('&#39;', '\'');

    const detectedLang = responseJSON.data.translations[0].detectedSourceLanguage;

    return ` ${detectedLang} -> en\n\n${translation}`;

}

module.exports = callback;