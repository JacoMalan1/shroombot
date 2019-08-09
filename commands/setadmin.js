const User = require('./user.js');

async function callback(sender, args, msg, gio) {

    if (args.length < 2)
        return 'Not enough arguments!';

    const sendingUser = new User(sender.id, sender.first_name, msg.chat.id, gio);
    const senderAdminLevel = await sendingUser.getAdminLevel();
    if (senderAdminLevel < 4)
        return 'You have insufficient permissions to perform this action!';

    const user = await User.fromFirstName(args[0], msg.chat.id, gio);

    if (!user)
        return 'User must be a chat admin to be a bot admin!';

    await user.setAdminLevel(parseInt(args[1]));

    return `User ${args[0]} (ID: ${user.id}) permission level set to: ${args[1]}`;

}

module.exports = callback;