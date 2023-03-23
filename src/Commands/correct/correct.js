const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow, MessageButton } = require('discord.js');
const languageToolApi = require('../../Apis/LanguageTool/languageTool');
const correccions = require('../../db/Correccions');

const name = 'correct';
const alias = ['corregir', 'corregeix', 'correcció', 'correccio', 'correccions', 'corrige', 'corrección', 'correccion', 'correcciones', 'correction'];

async function run(client, message, keyword) {
    try {
        let missatge_separat = message.content.split(keyword);
        if (missatge_separat[1] == "") return;
        let missatge = missatge_separat[1].trim();

        let response;
        let errors;

        await languageToolApi.getCorrection(missatge).then((res) => {
            response = res;
            errors = res.matches;
        })
        if (errors.length == 0) {
            message.reply({ content: "No hi ha cap error, molt bé!", components: [] })
        } else {
            let correccio = correccions.registerCorreccio(errors);
            let id = correccio.id;
            retornarFaltes(id, missatge, message, 0, 0);
        }
    } catch (error) {
        console.log(error);
    }

}

async function retornarFaltes(id, missatge, message, index, diferencia) {
    try {
        let correccio = correccions.getCorreccio(id);
        let missatge_separat = missatge.split("");
        missatge_separat.splice(correccio.errors[index].offset + diferencia, 0, "__");
        missatge_separat.splice(correccio.errors[index].offset + diferencia + correccio.errors[index].length + 1, 0, "__");
        let missatge_modificat = arrayToString(missatge_separat);
        let botons;
        switch (correccio.errors[index].replacements.length) {
            case 1:
                botons = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId(correccio.id + "--" + correccio.errors[index].replacements[0].value + "--" + index + "--" + diferencia)
                        .setLabel(correccio.errors[index].replacements[0].value)
                        .setStyle(ButtonStyle.Primary)
                )
                break;
            case 2:
                botons = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId(correccio.id + "--" + correccio.errors[index].replacements[0].value + "--" + index + "--" + diferencia)
                        .setLabel(correccio.errors[index].replacements[0].value)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(correccio.id + "--" + correccio.errors[index].replacements[1].value + "--" + index + "--" + diferencia)
                        .setLabel(correccio.errors[index].replacements[1].value)
                        .setStyle(ButtonStyle.Primary)
                )
                break;
            default:
                botons = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId(correccio.id + "--" + correccio.errors[index].replacements[0].value + "--" + index + "--" + diferencia)
                        .setLabel(correccio.errors[index].replacements[0].value)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(correccio.id + "--" + correccio.errors[index].replacements[1].value + "--" + index + "--" + diferencia)
                        .setLabel(correccio.errors[index].replacements[1].value)
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(correccio.id + "--" + correccio.errors[index].replacements[2].value + "--" + index + "--" + diferencia)
                        .setLabel(correccio.errors[index].replacements[2].value)
                        .setStyle(ButtonStyle.Primary)
                )
                break;
        }

        await message.reply({
            embeds: [{
                title: "Error",
                description: correccio.errors[index].message
            }],
            content: missatge_modificat, components: [botons]
        })
    } catch (error) {
        console.log(error);
    }

}

function arrayToString(array) {
    try {
        let string = "";
        for (let i = 0; i < array.length; i++) {
            string += array[i];
        }
        return string;
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    run,
    name,
    alias,
    retornarFaltes
}