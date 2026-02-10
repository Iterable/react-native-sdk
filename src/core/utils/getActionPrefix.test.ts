import { getActionPrefix } from './getActionPrefix';
import { IterableCustomActionPrefix } from '../enums/IterableCustomActionPrefix';

/**
 * Tests for getActionPrefix utility function.
 */
describe('getActionPrefix', () => {
  describe('when string starts with action:// prefix', () => {
    it('should return Action prefix for exact action:// string', () => {
      // GIVEN a string that is exactly the action prefix
      const str = 'action://';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return the Action prefix
      expect(result).toBe(IterableCustomActionPrefix.Action);
    });

    it('should return Action prefix for action:// with additional path', () => {
      // GIVEN a string starting with action:// and additional path
      const str = 'action://some/path';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return the Action prefix
      expect(result).toBe(IterableCustomActionPrefix.Action);
    });

    it('should return Action prefix for action:// with query params', () => {
      // GIVEN a string starting with action:// and query parameters
      const str = 'action://deeplink?param1=value1&param2=value2';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return the Action prefix
      expect(result).toBe(IterableCustomActionPrefix.Action);
    });
  });

  describe('when string starts with itbl:// prefix', () => {
    it('should return Itbl prefix for exact itbl:// string', () => {
      // GIVEN a string that is exactly the deprecated itbl prefix
      const str = 'itbl://';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return the Itbl prefix
      expect(result).toBe(IterableCustomActionPrefix.Itbl);
    });

    it('should return Itbl prefix for itbl:// with additional path', () => {
      // GIVEN a string starting with itbl:// and additional path
      const str = 'itbl://some/path';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return the Itbl prefix
      expect(result).toBe(IterableCustomActionPrefix.Itbl);
    });

    it('should return Itbl prefix for itbl:// with query params', () => {
      // GIVEN a string starting with itbl:// and query parameters
      const str = 'itbl://deeplink?param1=value1&param2=value2';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return the Itbl prefix
      expect(result).toBe(IterableCustomActionPrefix.Itbl);
    });
  });

  describe('when string does not have a recognized prefix', () => {
    it('should return null for regular URL', () => {
      // GIVEN a regular https URL
      const str = 'https://example.com';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should return null for http URL', () => {
      // GIVEN a regular http URL
      const str = 'http://example.com';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should return null for custom scheme URL', () => {
      // GIVEN a custom scheme URL that is not action:// or itbl://
      const str = 'myapp://deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should return null for plain text', () => {
      // GIVEN a plain text string
      const str = 'just some text';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      // GIVEN an empty string
      const str = '';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });
  });

  describe('when string is null or undefined', () => {
    it('should return null for undefined string', () => {
      // GIVEN an undefined string
      const str = undefined;

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should return null for null string', () => {
      // GIVEN a null string
      const str = null;

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });
  });

  describe('edge cases and case sensitivity', () => {
    it('should be case sensitive and not match ACTION://', () => {
      // GIVEN a string with uppercase ACTION://
      const str = 'ACTION://deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null (case sensitive)
      expect(result).toBeNull();
    });

    it('should be case sensitive and not match ITBL://', () => {
      // GIVEN a string with uppercase ITBL://
      const str = 'ITBL://deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null (case sensitive)
      expect(result).toBeNull();
    });

    it('should not match action:// in the middle of string', () => {
      // GIVEN a string with action:// not at the start
      const str = 'prefix action://deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should not match itbl:// in the middle of string', () => {
      // GIVEN a string with itbl:// not at the start
      const str = 'prefix itbl://deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should not match partial prefix action:', () => {
      // GIVEN a string with incomplete action prefix
      const str = 'action:deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });

    it('should not match partial prefix itbl:', () => {
      // GIVEN a string with incomplete itbl prefix
      const str = 'itbl:deeplink';

      // WHEN getting the action prefix
      const result = getActionPrefix(str);

      // THEN it should return null
      expect(result).toBeNull();
    });
  });
});

