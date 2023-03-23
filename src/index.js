const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Collection, Utils } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const corregirFrase = require('./Functions/corregirFrase');

const Bot = require('./Functions/client');
new Bot();