const API_KEY = process.env.API_KEY;

async function sendMethod(name, reqBody) {

    const response = await fetch(`https://api.telegram.org/bot${API_KEY}/${name}`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },

        body: JSON.stringify(reqBody)

    });

    const jsonData = await response.json();
    return jsonData;

}

class User {

    /**
     * Creates a new instance of the User object.
     * @param {*} id The user's ID
     * @param {*} firstName The user's first name
     * @param {*} chatId The ID of the chat the user belongs to
     * @param {*} gio The Global Information Object
     */
    constructor(id, firstName, chatId, gio) {

        this.id = id;
        this.chatId = chatId;
        this.firstName = firstName;
        this.gio = gio;

    }

    async getAdminLevel() {

        const colName = `${this.chatId}_admins`;
        const db = this.gio.firebaseDB;

        const docs = await db.collection(colName).where('id', '==', this.id).get();

        if (docs.size != 1)
            return -1;

        let user;
        docs.forEach(doc => user = doc.data());

        return user.adminLevel;

    }

    async setAdminLevel(level) {

        const user = { id: this.id, adminLevel: level, user_name: this.firstName };
        const db = this.gio.firebaseDB;
        const colName = `${this.chatId}_admins`;

        await db.collection(colName).doc(this.id.toString()).set(user);

    }

    static async fromFirstName(firstName, chatId, gio) {

        const response = await sendMethod('getChatAdministrators', { chat_id: chatId });
        
        console.log(response);

        if (!response)
            return null;

        if (!response.ok)
            return null;

        let found = false;
        let foundUser;

        for (let chatMember of response.result) {

            if (chatMember.user.first_name == firstName) {
                found = true;
                foundUser = chatMember.user;
            }

        }

        if (!found)
            return null;

        return new User(foundUser.id, foundUser.first_name, chatId, gio);

    }

}

module.exports = User;