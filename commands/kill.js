async function callback(sender, args) {
    
    if (args.length < 1) {
        return 'Not enough arguments!';
    }

    const victor = sender.first_name;
    const victim = args[0];

    const stuff = '';
    stuff.toLowerCase();

    if (victim.toLowerCase() == 'franco') {
        // Special detrimental case for the biggest idiot in the world
        // :)
        return `${victor} beats Franco with a 440BX motherboard until it slumps to the ground.`;
    } else {
        return `${victor} beats ${victim} with a 440BX motherboard until they slump to the ground.`;
    }

}

module.exports = callback;