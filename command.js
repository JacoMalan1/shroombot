class Command {

    /**
     * Constructs a new Command object.
     * @param {Array<String>} names All the possible names for the command.
     * @param {*} callback A callback to execute.
     */
    constructor(names, callback) {

        this.names = names;
        this.callback = callback;

    }

    /**
     * Executes the specified command.
     * @param {*} sender The literal From object from telegram.
     * @param {Array<String>} args A list of arguments to be passed to the command.
     */
    execute(sender, args, msg, gio) {

        if (this.callback != null) {
            return this.callback(sender, args, msg, gio);
        } else {
            return '';
        }

    }

}

module.exports = Command;