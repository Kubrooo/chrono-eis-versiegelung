import { outro } from '@clack/prompts';
import pc from 'picocolors';

export const handleError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  outro(`${pc.red('Error:')} ${message}`);
  process.exit(1);
};