import { Command, Run } from '../types';
import { getLinkPreview } from 'link-preview-js';

export default class Add implements Command {
  name = 'add';
  command = 'add';
  description = 'add link for save';

  run: Run = async (message, args) => {
    const link = args[0];
    const preview = await getLinkPreview(link);

    console.log(preview);
  };
}
