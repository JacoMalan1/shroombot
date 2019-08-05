async function callback(sender, args, msg, gio) {
    
    const admins = JSON.parse(process.env.ADMIN_USERS);
    
    let found = false;
    admins.forEach(admin => {
        if (admin == sender.first_name) {
            found = true;
        }
    });

    if (!found) {
        return 'You are not an admin!';
    }

    const json_list = process.env.IGNORE_LIST || '[]';
    const ignore_list = JSON.parse(json_list);
    
    const unit = args[1][args[1].length - 1];
    const seconds = 60 * parseInt(args[0]);
    if (unit == 'h')
        seconds *= 60;

    const ignore_obj = { user: args[0], duration: seconds };
    ignore_list.push(ignore_obj);
    process.env.IGNORE_LIST = JSON.stringify(ignore_list);

    return `Now ignoring ${args[0]} for ${time}${unit == 'h' ? 'mins' : 'hrs'}...`;

}

module.exports = callback;