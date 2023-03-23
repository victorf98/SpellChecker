const { retornarFaltes } = require("../commands/correct/correct.js");
const correccions = require('../db/Correccions');


function execute(interaction) {
    try {
        let id = interaction.customId.split("--")[0];
        let button = interaction.customId.split("--")[1];
        let index = interaction.customId.split("--")[2];
        let diferencia = parseInt(interaction.customId.split("--")[3]);
        let correccio = correccions.getCorreccio(id);
        let llargada_anterior = correccio.errors[parseInt(index)].length;
        let llargada_nova = button.length;
        let llargada_errors = correccio.errors.length;
        let missatge = interaction.message.content;
        let missatge_separat = missatge.split("__");
        let missatge_modificat = missatge_separat[0] + button + missatge_separat[2];
        diferencia = diferencia + llargada_nova - llargada_anterior;
        interaction.message.delete();
        if (index < llargada_errors - 1) {
            retornarFaltes(id, missatge_modificat, interaction, parseInt(index) + 1, diferencia);
        } else {
            correccions.deleteCorreccio(id);
            interaction.reply({
                embeds: [{
                    title: "Correcció completada",
                    description: "No hi ha més errors"
                }], content: missatge_modificat
            });
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    execute
};