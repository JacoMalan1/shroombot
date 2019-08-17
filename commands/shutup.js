async function callback(sender, args) {

    if (args.length < 1)
        return 'Not enough arguments!';

    return `The universe wishes for ${args[0]} to shut up!`;

}

module.exports = callback;