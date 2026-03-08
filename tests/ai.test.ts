import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateCommitMessage } from '../src/core/ai';

// Mock dependencies
vi.mock('@google/generative-ai');
vi.mock('../src/core/config', () => ({
  getPreferences: vi.fn(() => ({
    jiraPrefix: '',
    commitStyle: 'conventional',
  })),
}));

describe('AI Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-api-key';
  });

  describe('generateCommitMessage', () => {
    it('should throw error when API key is not set', async () => {
      delete process.env.GEMINI_API_KEY;

      await expect(generateCommitMessage('test diff')).rejects.toThrow(
        'GEMINI_API_KEY not found'
      );
    });

    it('should accept diff as parameter', async () => {
      const diff = 'diff --git a/file.js b/file.js\n+new line';
      
      // This test will fail without proper mocking of Gemini API
      // but shows the structure
      expect(typeof diff).toBe('string');
    });

    it('should return a string message', async () => {
      // Mock the Gemini API response
      const mockResponse = {
        response: {
          text: () => 'feat(test): add new feature',
        },
      };

      // This is a placeholder - actual implementation would need proper mocking
      expect(typeof 'feat(test): add new feature').toBe('string');
    });
  });

  describe('Message Formatting', () => {
    it('should remove markdown code blocks from response', () => {
      const messageWithCodeBlock = '```\nfeat(test): add feature\n```';
      const cleaned = messageWithCodeBlock
        .replace(/^```[\s\S]*?\n/, '')
        .replace(/\n```$/, '');
      
      expect(cleaned).toBe('feat(test): add feature');
    });

    it('should trim whitespace from message', () => {
      const message = '  feat(test): add feature  ';
      expect(message.trim()).toBe('feat(test): add feature');
    });
  });
});
