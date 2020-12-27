import { Message } from 'discord.js';

export type Run = (Message: Message, args: string[]) => void;

export interface Command {
  name: string;
  command: string;
  description: string;
  run: Run;
}
