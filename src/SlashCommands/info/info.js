const { SlashCommandBuilder } = require("discord.js")
module.exports = {
    cmd: new SlashCommandBuilder()
        .setDescription("Aquesta comanda informa"),

    async execute(client, interaction) {
        try {
            interaction.reply("**Com fer servir l'aplicació:**\n" +
            "1. Escriu la frase que vols corregir\n"
            + "2. Aquesta frase haurà de contenir la paraula 'corregir' en català, castellà o anglès:\n"
            + "     - ENG: 'correct', 'correction'\n"
            + "     - CAT: 'corregir', 'corregeix', 'correcció', 'correccio', 'correccions'\n"
            + "     - ESP:  'corrige', 'corrección', 'correccion', 'correcciones'\n"
            + "3. El bot llegirà tot el contingut qui hi hagi després de la paraula 'corregir' o algun dels seus derivats\n"
            + "4. Espera a que l'aplicació et digui quins errors hi ha i quines són les correccions\n"
            + "5. Fes click al botó que conté la correcció que vols fer servir\n"
            + "6. Repeteix els passos 4 i 5 fins que no hi hagi més errors\n")
        } catch (error) {
            console.log(error);
        }
    }
}