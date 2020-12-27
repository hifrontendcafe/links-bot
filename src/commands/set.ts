import { Command, Run } from '../types';
import { BotConfig } from '../config';

export default class Set implements Command {
  name = 'set';
  command = 'set';
  description = 'set the channel where the links is saved';

  run: Run = async (message, args) => {
    if (args[0] === 'prefix') {
      BotConfig.prefix = args[1];
      await message.client.user?.setActivity(args[1], { type: 'PLAYING' });
    } else if (args[0] === 'channel') {
      const channel = message.mentions.channels.first();
      if (!channel) {
        const msg = await message.reply("that channel don't exist");
        await message.delete();
        await msg.delete({ timeout: 2000 });
        return;
      }

      BotConfig.channel = channel.id;
    }

    await message.react('✅');
    await message.delete({ timeout: 2000 });
  };
}
