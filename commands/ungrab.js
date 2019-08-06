async function callback(sender, args, msg, gio) {

    if (args.length < 1)
        return 'Not enough arguments!';

    let found = false;
    const adminList = JSON.parse(process.env.ADMIN_USERS);
    adminList.forEach(user => {
        if (user == sender.first_name)
            found = true;
    });

    if (!found)
        return 'You are not an admin!';

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