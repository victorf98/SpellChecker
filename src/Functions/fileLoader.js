const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);
const fs = require("fs");


class BotUtils {
  constructor(client) {
    this.client = client;
  }
}


module.exports = {
  BotUtils 
};