import { execa } from 'execa';

export const checkIsGitRepo = async () => {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree']);
  } catch {
    throw new Error('Folder ini bukan repository Git!');
  }
};

export const getStagedDiff = async () => {
  const { stdout } = await execa('git', ['diff', '--cached']);
  if (!stdout) {
    throw new Error('Tidak ada perubahan yang di-staged (run git add dulu!)');
  }
  return stdout;
};

export const exectCommit = async (message: string) => {
  try{
    await execa('git', ['commit', '-m', message]);
  } catch (error) {
    throw new Error('Gagal melakukan commit. Cek kembali status git kamu.')
  }
};