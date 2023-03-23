const cmd = require("../../commands/correct/correct.js");


module.exports = async (client, message) => {
    try {
        if (!message.guild || !message.channel || message.author.bot) return;

        if (message.content.startsWith("/")) return;
        let keywords = [];

        keywords.push(cmd.name);
        cmd.alias.forEach((alias) => {
            keywords.push(alias);
        });
        let keyword = hiHaKeywords(message.content.split(" "), keywords);
        if (keyword) {
            try {
                cmd.run(client, message, keyword)
            } catch (error) {
                message.reply({ context: error });
            }
        }
    } catch (error) {
        console.log(error);
    }

}

function hiHaKeywords(missatge, keywords) {
    try {
        for (let i = 0; i < missatge.length; i++) {
            for (let j = 0; j < keywords.length; j++) {
                if (missatge[i] === keywords[j]) {
                    return keywords[j];
                }
            }
        }
        return false;
    } catch (error) {
        console.log(error);
    }

}