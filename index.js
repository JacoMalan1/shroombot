const express = require('express');

const app = express();
const commands = [];

function registerCommand(command) {
    commands.push(command);
}

function update() {
    
}

// Load environment variables
require('dotenv').config();
express.json()

app.post('/webhooks/update', (req, res) => {

    

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));