const User = require('./user.js');

async function callback(sender, args, msg, gio) {
    
    const user = new User(sender.id, sender.first_name, msg.chat.id, gio);
    const adminLevel = await user.getAdminLevel();
    if (adminLevel < 1)
        return 'You have insufficient permissions to perform this action!';

    const json_list = process.env.IGNORE_LIST || '[]';
    const ignore_list = JSON.parse(json_list);
    
    let unit = 'm';
    let duration = 5;
    let seconds = 60 * 5;

    if (args.length >= 2) {
        duration = parseInt(args[1].substring(0, args[1].length - 1));
        unit = args[1][args[1].length - 1];
        seconds = 60 * duration;
        if (unit == 'h')
            seconds *= 60;
    }

    const ignore_obj = { user: args[0], duration: seconds };
    ignore_list.push(ignore_obj);
    process.env.IGNORE_LIST = JSON.stringify(ignore_list);

    return `Now ignoring ${args[0]} for ${duration}${unit == 'm' ? 'mins' : 'hrs'}...`;

}

module.exports = callback;