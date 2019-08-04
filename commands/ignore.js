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

    const ignore_list = JSON.parse(process.env.IGNORE_LIST);
    ignore_list.push(args[0]);
    process.env.IGNORE_LIST = JSON.stringify(ignore_list);

    return `Now ignoring ${args[0]}...`;

}

module.exports = callback;