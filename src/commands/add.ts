import { MessageEmbed } from 'discord.js';
import { Command, Run } from '../types';
import { getLinkPreview } from 'link-preview-js';

export default class Add implements Command {
  name = 'add';
  command = 'add';
  description = 'add link for save';

  run: Run = async (message, args) => {
    const link = args[0];
    const preview = await getLinkPreview(link);

    if (!preview.contentType?.includes('text/html')) return;

    await message.delete();

    const embed = new MessageEmbed()
      .setTitle((preview as any).title)
      .setImage((preview as any).images[0])
      .setURL(preview.url)
      .setDescription((preview as any).description || '')
      .setAuthor(
        message.author.tag,
        message.author.avatarURL() || message.author.defaultAvatarURL
      );

    await message.channel.send(embed);
  };
}
