async function callback(sender, args) {

    if (args.length < 1)
        return 'Not enough arguments!';

    return `The mighty ${sender.first_name} smited ${args[0]}!`;

}

module.exports = callback;