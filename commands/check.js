async function callback(sender, args) {

    if (args.length < 1)
        return 'Not enough arguments!';

    let phrase = '';
    args.forEach(arg => phrase += arg + ' ');

    if (Math.random() < 0.5) {
        return `Checking ${phrase}: [FAIL]`;
    } else {
        return `Checking ${phrase}: [PASS]`;
    }

}

module.exports = callback;