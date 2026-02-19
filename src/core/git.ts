import { execa } from 'execa';

export const checkIsGitRepo = async () => {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree']);
  } catch {
    throw new Error('This folder isnt a git repository!');
  }
};

export const getStagedDiff = async () => {
  const { stdout } = await execa('git', ['diff', '--cached']);
  if (!stdout) {
    throw new Error('No change are stage (run git add first!)');
  }
  return stdout;
};

export const exectCommit = async (message: string) => {
  try{
    await execa('git', ['commit', '-m', message]);
  } catch (error) {
    throw new Error('Failed to commit. Check your git status again.')
  }
};