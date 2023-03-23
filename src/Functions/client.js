const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { BotUtils } = require('./fileLoader');

const config = require("../../config.json");
const fs = require("fs");

module.exports = class extends Client {
    constructor(options = {
        intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
        partials: [User, Message, GuildMember, ThreadMember],

    }) {
        super({
            ...options
        });
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = [];
        this.utils = new BotUtils(this);

        this.start();
    }

    async start() {
        try {
            await this.loadEvents();
            await this.loadCommands();
            await this.loadSlashCommands();

            this.login(config.token);
        } catch (error) {
            console.log(error);
        }
    }


    async loadCommands() {
        try {
            console.log("Loading commands...");
            await this.commands.clear();

            const route = __dirname + "/../commands";
            const files_route = fs.readdirSync(route);
            if (files_route.length) {
                files_route.forEach((dir) => {
                    try {
                        const commands = fs.readdirSync(`${route}/${dir}/`).filter((file) => file.endsWith(".js"));
                        for (let command_name of commands) {
                            const command = require(`${route}/${dir}/${command_name}`);
                            command.name = command_name.split(".")[0];

                            if (command_name) {
                                this.commands.set(command.name, command_name);
                            }
                        }

                    } catch (error) {
                        console.log(error);
                    }
                })
            }
            console.log(this.commands.size + " commands loaded.");
        } catch (error) {
            console.log(error);
        }
    }

    async loadSlashCommands() {
        try {
            console.log("Loading /commands...");
            await this.slashCommands.clear();
            this.slashArray = [];

            const route = __dirname + "/../SlashCommands";
            const files_route = fs.readdirSync(route);
            if (files_route.length) {
                files_route.forEach((dir) => {
                    try {
                        const commands = fs.readdirSync(`${route}/${dir}/`).filter((file) => file.endsWith(".js"));
                        for (let command_name of commands) {
                            const command = require(`${route}/${dir}/${command_name}`);
                            command.cmd.name = command_name.split(".")[0];

                            if (command_name) {
                                this.slashCommands.set(command_name.split(".")[0], command_name);
                            }
                            this.slashArray.push(command.cmd.toJSON());
                        }

                    } catch (error) {
                        console.log(error);
                    }
                })
            }

            if (this?.application?.commands) {
                this.application.commands.set(this.slashArray);
                console.log(this.slashCommands.size + " slash commands loaded.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loadEvents() {
        try {
            console.log("Loading events...");
            this.removeAllListeners();

            const route = __dirname + "/../events";
            const files_route = fs.readdirSync(route);
            if (files_route.length) {
                files_route.forEach((dir) => {
                    try {
                        const events = fs.readdirSync(`${route}/${dir}/`).filter((file) => file.endsWith(".js"));
                        for (let event_name of events) {
                            const event = require(`${route}/${dir}/${event_name}`);
                            this.on(event_name.split(".")[0], event.bind(null, this));
                        }

                    } catch (error) {
                        console.log(error);
                    }
                })
            }

            console.log(files_route.length + " events loaded.");

        } catch (error) {
            console.log(error);
        }
    }

}