class Command {

    /**
     * Constructs a new Command object.
     * @param {*} aliases All the possible names for the command.
     * @param {*} callback A callback to execute.
     */
    constructor(aliases, callback) {

        this.aliases = aliases;
        this.callback = callback;

    }

    execute(sender, args) {

        if (this.callback != null) {
            this.callback(sender, args);
        }

    }

}