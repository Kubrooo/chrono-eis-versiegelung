import { describe, it, expect, vi } from 'vitest';
import { checkIsGitRepo, getStagedDiff } from '../src/core/git';
import { execa } from 'execa';

vi.mock('execa');

describe('Git Module', () => {
  describe('checkIsGitRepo', () => {
    it('should not throw error when inside git repository', async () => {
      vi.mocked(execa).mockResolvedValueOnce({
        stdout: 'true',
        stderr: '',
        exitCode: 0,
      } as any);

      await expect(checkIsGitRepo()).resolves.not.toThrow();
    });

    it('should throw error when not in git repository', async () => {
      vi.mocked(execa).mockRejectedValueOnce(new Error('Not a git repository'));

      await expect(checkIsGitRepo()).rejects.toThrow(
        'Not a git repository. Run "git init" to initialize a git repository.'
      );
    });
  });

  describe('getStagedDiff', () => {
    it('should return diff when changes are staged', async () => {
      const mockDiff = 'diff --git a/file.js b/file.js\n+new line';
      
      vi.mocked(execa).mockResolvedValueOnce({
        stdout: mockDiff,
        stderr: '',
        exitCode: 0,
      } as any);

      const diff = await getStagedDiff();
      expect(diff).toBe(mockDiff);
    });

    it('should throw error when no changes are staged', async () => {
      vi.mocked(execa).mockResolvedValueOnce({
        stdout: '',
        stderr: '',
        exitCode: 0,
      } as any);

      await expect(getStagedDiff()).rejects.toThrow(
        'No changes are staged. Run "git add <files>" first to stage your changes.'
      );
    });
  });
});
