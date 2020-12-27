import Discord from 'discord.js';
import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import isUrl from 'is-url';

import { Command } from './types';
import { BotConfig } from './config';

dotenv.config();
const client = new Discord.Client({
  presence: {
    status: 'online',
    activity: {
      type: 'PLAYING',
      name: BotConfig.prefix
    }
  }
});

glob.sync('./src/commands/**/*.ts').forEach(async file => {
  const { default: Command } = await import(path.resolve(file));
  commands.push(new Command());
});

const commands: Command[] = [];

client.on('message', message => {
  if (isUrl(message.content) && message.channel.id === BotConfig.channel) {
    const add = commands.find(c => c.name === 'add');
    add?.run(message, [message.content]);
  }
  const [prefix, userCommand, ...args] = message.content.split(' ');
  if (prefix !== BotConfig.prefix) return;

  const command = commands.find(c => userCommand === c.command);
  if (!command) return;

  command.run(message, args);
});

client.login(process.env.DISCORD_BOT_TOKEN).then(() => console.log('Bot ON'));
