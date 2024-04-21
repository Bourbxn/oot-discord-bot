const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const { TOKEN } = process.env;

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

//lazygit(1)
client.handleEvents();
client.handleCommands();
client.login(TOKEN);
