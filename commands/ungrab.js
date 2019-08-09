const User = require('./user.js');

async function callback(sender, args, msg, gio) {

    if (args.length < 1)
        return 'Not enough arguments!';
        
    const user = new User(sender.id, sender.first_name, msg.chat.id, gio);
    const adminLevel = await user.getAdminLevel();
    if (adminLevel < 0)
        return 'You have insufficient permissions to perform this action!';

    const ungrabID = parseInt(args[0]);
    if (!ungrabID)
        return 'Invalid grab ID';

    const db = gio.firebaseDB;
    const colName = `${msg.chat.id}_quotes`;
    const docs = await db.collection(colName).where('id', '==', ungrabID).get();

    if (docs.size != 1)
        return 'Grab ID not found!';

    docs.forEach(doc => doc.ref.delete());

    return `Grab (ID: ${args[0]} deleted)`;

}

module.exports = callback;