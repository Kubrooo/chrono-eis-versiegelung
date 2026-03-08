import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getPreferences, setPreference } from '../src/core/config';
import Conf from 'conf';

describe('Config Module', () => {
  let testConfig: Conf;

  beforeEach(() => {
    testConfig = new Conf({ projectName: 'chrono-cli-test' });
  });

  afterEach(() => {
    testConfig.clear();
  });

  describe('getPreferences', () => {
    it('should return default preferences when none are set', () => {
      const prefs = getPreferences();
      
      expect(prefs).toHaveProperty('jiraPrefix');
      expect(prefs).toHaveProperty('commitStyle');
      expect(prefs.commitStyle).toBe('conventional');
    });

    it('should return empty string for jiraPrefix by default', () => {
      const prefs = getPreferences();
      expect(prefs.jiraPrefix).toBe('');
    });
  });

  describe('setPreference', () => {
    it('should set a preference value', () => {
      setPreference('jiraPrefix', 'TEST');
      const prefs = getPreferences();
      expect(prefs.jiraPrefix).toBe('TEST');
    });

    it('should delete preference when value is empty string', () => {
      setPreference('jiraPrefix', 'TEST');
      setPreference('jiraPrefix', '');
      const prefs = getPreferences();
      expect(prefs.jiraPrefix).toBe('');
    });

    it('should delete preference when value is null', () => {
      setPreference('jiraPrefix', 'TEST');
      setPreference('jiraPrefix', null);
      const prefs = getPreferences();
      expect(prefs.jiraPrefix).toBe('');
    });

    it('should delete preference when value is undefined', () => {
      setPreference('jiraPrefix', 'TEST');
      setPreference('jiraPrefix', undefined);
      const prefs = getPreferences();
      expect(prefs.jiraPrefix).toBe('');
    });
  });
});
