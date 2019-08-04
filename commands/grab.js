const firebase = require('firebase');
require('firebase/firestore');
const fs = require('fs');

async function callback(sender, args, msg, gio) {

    const colName = `${msg.chat.id}_quotes`;

    console.log(gio);
    if (!gio.lnc.text) {
        return null;
    }

    const entry = {

        id: msg.message_id,
        text: gio.lnc.text,
        user_name: gio.lnc.from.first_name,
        user_id: gio.lnc.from.id

    };

    const db = gio.firebaseDB;
    db.collection(colName).doc(entry.id.toString()).set(entry).catch(err => console.error(err));

    return `${entry.text}\nGrabbed! (Grab id: ${entry.id})`;

}

module.exports = callback;