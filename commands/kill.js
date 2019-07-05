async function callback(sender, args) {
    
    const victor = sender.first_name;
    const victim = args[0];

    return `${victor} beats ${victim} with a 440BX motherboard until they slump to the ground.`;

}

module.exports = callback;