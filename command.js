class Command {

    /**
     * Constructs a new Command object.
     * @param {Array<String>} aliases All the possible names for the command.
     * @param {*} callback A callback to execute.
     */
    constructor(aliases, callback) {

        this.aliases = aliases;
        this.callback = callback;

    }

    /**
     * Executes the specified command.
     * @param {*} sender The literal From object from telegram.
     * @param {Array<String>} args A list of arguments to be passed to the command.
     */
    execute(sender, args) {

        if (this.callback != null) {
            return this.callback(sender, args);
        } else {
            return '';
        }

    }

}

module.exports = Command;