import { IterableUtil } from './IterableUtil';

/**
 * Tests for IterableUtil class.
 *
 * Note: The current implementation of readBoolean has a limitation - it doesn't actually
 * validate that the value is a boolean. It returns any truthy value as-is, or false for falsy values.
 * This behavior is tested below, but the implementation may need to be updated to properly
 * validate boolean types as suggested in the TODO comment in the source code.
 */
describe('IterableUtil', () => {
  describe('readBoolean', () => {
    it('should return true when the key exists and value is true', () => {
      // GIVEN a dictionary with a true boolean value
      const dict = { testKey: true };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return true
      expect(result).toBe(true);
    });

    it('should return false when the key exists and value is false', () => {
      // GIVEN a dictionary with a false boolean value
      const dict = { testKey: false };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should return false when the key does not exist', () => {
      // GIVEN a dictionary without the key
      const dict = { otherKey: true };

      // WHEN reading a non-existent key
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should return false when the key exists but value is undefined', () => {
      // GIVEN a dictionary with undefined value
      const dict = { testKey: undefined };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should return false when the key exists but value is null', () => {
      // GIVEN a dictionary with null value
      const dict = { testKey: null };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should return false when the key exists but value is 0', () => {
      // GIVEN a dictionary with 0 value
      const dict = { testKey: 0 };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should return false when the key exists but value is empty string', () => {
      // GIVEN a dictionary with empty string value
      const dict = { testKey: '' };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should return false when the key exists but value is NaN', () => {
      // GIVEN a dictionary with NaN value
      const dict = { testKey: NaN };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    // TODO: Verify that we want this to return a string instead of a boolean
    it('should return truthy string as boolean when key exists', () => {
      // GIVEN a dictionary with truthy string value
      const dict = { testKey: 'true' };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return the string cast to boolean (truthy)
      expect(result).toBe('true');
    });

    // TODO: Verify that we want this to return a number instead of a boolean
    it('should return truthy number as boolean when key exists', () => {
      // GIVEN a dictionary with truthy number value
      const dict = { testKey: 1 };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return the number cast to boolean (truthy)
      expect(result).toBe(1);
    });

    // TODO: Verify that we want this to return an object instead of a boolean
    it('should return truthy object as boolean when key exists', () => {
      // GIVEN a dictionary with truthy object value
      const dict = { testKey: {} };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return the object cast to boolean (truthy)
      expect(result).toEqual({});
    });

    // TODO: Verify that we want this to return an array instead of a boolean
    it('should return truthy array as boolean when key exists', () => {
      // GIVEN a dictionary with truthy array value
      const dict = { testKey: [] };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return the array cast to boolean (truthy)
      expect(result).toEqual([]);
    });

    // TODO: Verify that we want this to return a function instead of a boolean
    it('should return truthy function as boolean when key exists', () => {
      // GIVEN a dictionary with truthy function value
      const dict = { testKey: () => {} };

      // WHEN reading the boolean value
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return the function cast to boolean (truthy)
      expect(result).toBeInstanceOf(Function);
    });

    it('should handle empty dictionary', () => {
      // GIVEN an empty dictionary
      const dict = {};

      // WHEN reading a key from empty dictionary
      const result = IterableUtil.readBoolean(dict, 'testKey');

      // THEN it should return false
      expect(result).toBe(false);
    });

    it('should handle dictionary with multiple keys', () => {
      // GIVEN a dictionary with multiple keys
      const dict = {
        key1: true,
        key2: false,
        key3: 'string',
        key4: 123
      };

      // WHEN reading different keys
      const result1 = IterableUtil.readBoolean(dict, 'key1');
      const result2 = IterableUtil.readBoolean(dict, 'key2');
      const result3 = IterableUtil.readBoolean(dict, 'key3');
      const result4 = IterableUtil.readBoolean(dict, 'key4');
      const result5 = IterableUtil.readBoolean(dict, 'nonExistentKey');

      // THEN it should return correct values
      expect(result1).toBe(true);
      expect(result2).toBe(false);
      expect(result3).toBe('string'); // truthy string is returned as-is
      expect(result4).toBe(123); // truthy number is returned as-is
      expect(result5).toBe(false); // key doesn't exist
    });

    it('should handle special boolean values', () => {
      // GIVEN a dictionary with special boolean values
      const dict = {
        trueValue: true,
        falseValue: false
      };

      // WHEN reading boolean values
      const trueResult = IterableUtil.readBoolean(dict, 'trueValue');
      const falseResult = IterableUtil.readBoolean(dict, 'falseValue');

      // THEN it should return the actual boolean values
      expect(trueResult).toBe(true);
      expect(falseResult).toBe(false);
    });

    it('should handle case sensitivity in keys', () => {
      // GIVEN a dictionary with case-sensitive keys
      const dict = { TestKey: true, testkey: false };

      // WHEN reading with different case
      const result1 = IterableUtil.readBoolean(dict, 'TestKey');
      const result2 = IterableUtil.readBoolean(dict, 'testkey');
      const result3 = IterableUtil.readBoolean(dict, 'TESTKEY');

      // THEN it should be case sensitive
      expect(result1).toBe(true);
      expect(result2).toBe(false);
      expect(result3).toBe(false); // key doesn't exist
    });
  });
});
