module.exports = client => {
    try {
        console.log(`Logged in as ${client.user.tag}!`);
        if (client?.application?.commands) {
            client.application.commands.set(client.slashArray);
            console.log(client.slashCommands.size + " slash commands loaded.");
        }
    } catch (error) {
        console.log(error);
    }

};