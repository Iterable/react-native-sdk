import { IterableEdgeInsets } from './IterableEdgeInsets';
import type { IterableEdgeInsetDetails } from '../types';

describe('IterableEdgeInsets', () => {
  describe('constructor', () => {
    it('should create instance with valid parameters', () => {
      // GIVEN valid edge inset parameters
      const top = 10;
      const left = 20;
      const bottom = 30;
      const right = 40;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should have the correct properties
      expect(edgeInsets.top).toBe(top);
      expect(edgeInsets.left).toBe(left);
      expect(edgeInsets.bottom).toBe(bottom);
      expect(edgeInsets.right).toBe(right);
    });

    it('should create instance with zero values', () => {
      // GIVEN zero edge inset parameters
      const top = 0;
      const left = 0;
      const bottom = 0;
      const right = 0;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should have zero values
      expect(edgeInsets.top).toBe(0);
      expect(edgeInsets.left).toBe(0);
      expect(edgeInsets.bottom).toBe(0);
      expect(edgeInsets.right).toBe(0);
    });

    it('should create instance with negative values', () => {
      // GIVEN negative edge inset parameters
      const top = -5;
      const left = -10;
      const bottom = -15;
      const right = -20;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should have the negative values
      expect(edgeInsets.top).toBe(-5);
      expect(edgeInsets.left).toBe(-10);
      expect(edgeInsets.bottom).toBe(-15);
      expect(edgeInsets.right).toBe(-20);
    });

    it('should create instance with decimal values', () => {
      // GIVEN decimal edge inset parameters
      const top = 1.5;
      const left = 2.7;
      const bottom = 3.9;
      const right = 4.1;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should have the decimal values
      expect(edgeInsets.top).toBe(1.5);
      expect(edgeInsets.left).toBe(2.7);
      expect(edgeInsets.bottom).toBe(3.9);
      expect(edgeInsets.right).toBe(4.1);
    });

    it('should create instance with large values', () => {
      // GIVEN large edge inset parameters
      const top = 1000;
      const left = 2000;
      const bottom = 3000;
      const right = 4000;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should have the large values
      expect(edgeInsets.top).toBe(1000);
      expect(edgeInsets.left).toBe(2000);
      expect(edgeInsets.bottom).toBe(3000);
      expect(edgeInsets.right).toBe(4000);
    });
  });

  describe('fromDict', () => {
    it('should create instance from valid dictionary', () => {
      // GIVEN a valid dictionary with edge inset details
      const dict: IterableEdgeInsetDetails = {
        top: 10,
        left: 20,
        bottom: 30,
        right: 40
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have the correct properties
      expect(edgeInsets.top).toBe(10);
      expect(edgeInsets.left).toBe(20);
      expect(edgeInsets.bottom).toBe(30);
      expect(edgeInsets.right).toBe(40);
    });

    it('should create instance from dictionary with zero values', () => {
      // GIVEN a dictionary with zero values
      const dict: IterableEdgeInsetDetails = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have zero values
      expect(edgeInsets.top).toBe(0);
      expect(edgeInsets.left).toBe(0);
      expect(edgeInsets.bottom).toBe(0);
      expect(edgeInsets.right).toBe(0);
    });

    it('should create instance from dictionary with negative values', () => {
      // GIVEN a dictionary with negative values
      const dict: IterableEdgeInsetDetails = {
        top: -5,
        left: -10,
        bottom: -15,
        right: -20
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have the negative values
      expect(edgeInsets.top).toBe(-5);
      expect(edgeInsets.left).toBe(-10);
      expect(edgeInsets.bottom).toBe(-15);
      expect(edgeInsets.right).toBe(-20);
    });

    it('should create instance from dictionary with decimal values', () => {
      // GIVEN a dictionary with decimal values
      const dict: IterableEdgeInsetDetails = {
        top: 1.5,
        left: 2.7,
        bottom: 3.9,
        right: 4.1
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have the decimal values
      expect(edgeInsets.top).toBe(1.5);
      expect(edgeInsets.left).toBe(2.7);
      expect(edgeInsets.bottom).toBe(3.9);
      expect(edgeInsets.right).toBe(4.1);
    });

    it('should create instance from dictionary with mixed positive and negative values', () => {
      // GIVEN a dictionary with mixed values
      const dict: IterableEdgeInsetDetails = {
        top: 10,
        left: -5,
        bottom: 0,
        right: 15
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have the mixed values
      expect(edgeInsets.top).toBe(10);
      expect(edgeInsets.left).toBe(-5);
      expect(edgeInsets.bottom).toBe(0);
      expect(edgeInsets.right).toBe(15);
    });
  });

  describe('property access', () => {
    it('should allow property modification', () => {
      // GIVEN an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(10, 20, 30, 40);

      // WHEN modifying properties
      edgeInsets.top = 100;
      edgeInsets.left = 200;
      edgeInsets.bottom = 300;
      edgeInsets.right = 400;

      // THEN the properties should be updated
      expect(edgeInsets.top).toBe(100);
      expect(edgeInsets.left).toBe(200);
      expect(edgeInsets.bottom).toBe(300);
      expect(edgeInsets.right).toBe(400);
    });

    it('should maintain property independence', () => {
      // GIVEN an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(10, 20, 30, 40);

      // WHEN modifying one property
      edgeInsets.top = 999;

      // THEN other properties should remain unchanged
      expect(edgeInsets.top).toBe(999);
      expect(edgeInsets.left).toBe(20);
      expect(edgeInsets.bottom).toBe(30);
      expect(edgeInsets.right).toBe(40);
    });
  });

  describe('edge cases', () => {
    it('should handle NaN values', () => {
      // GIVEN NaN values
      const top = NaN;
      const left = NaN;
      const bottom = NaN;
      const right = NaN;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should store NaN values
      expect(edgeInsets.top).toBeNaN();
      expect(edgeInsets.left).toBeNaN();
      expect(edgeInsets.bottom).toBeNaN();
      expect(edgeInsets.right).toBeNaN();
    });

    it('should handle Infinity values', () => {
      // GIVEN Infinity values
      const top = Infinity;
      const left = -Infinity;
      const bottom = Infinity;
      const right = -Infinity;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should store Infinity values
      expect(edgeInsets.top).toBe(Infinity);
      expect(edgeInsets.left).toBe(-Infinity);
      expect(edgeInsets.bottom).toBe(Infinity);
      expect(edgeInsets.right).toBe(-Infinity);
    });

    it('should handle very small decimal values', () => {
      // GIVEN very small decimal values
      const top = 0.0001;
      const left = 0.0002;
      const bottom = 0.0003;
      const right = 0.0004;

      // WHEN creating an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(top, left, bottom, right);

      // THEN it should store the small decimal values
      expect(edgeInsets.top).toBe(0.0001);
      expect(edgeInsets.left).toBe(0.0002);
      expect(edgeInsets.bottom).toBe(0.0003);
      expect(edgeInsets.right).toBe(0.0004);
    });
  });

  describe('interface compliance', () => {
    it('should implement IterableEdgeInsetDetails interface', () => {
      // GIVEN an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(10, 20, 30, 40);

      // THEN it should have all required properties
      expect(edgeInsets).toHaveProperty('top');
      expect(edgeInsets).toHaveProperty('left');
      expect(edgeInsets).toHaveProperty('bottom');
      expect(edgeInsets).toHaveProperty('right');

      // AND all properties should be numbers
      expect(typeof edgeInsets.top).toBe('number');
      expect(typeof edgeInsets.left).toBe('number');
      expect(typeof edgeInsets.bottom).toBe('number');
      expect(typeof edgeInsets.right).toBe('number');
    });

    it('should be assignable to IterableEdgeInsetDetails', () => {
      // GIVEN an IterableEdgeInsets instance
      const edgeInsets = new IterableEdgeInsets(10, 20, 30, 40);

      // WHEN assigning to IterableEdgeInsetDetails
      const details: IterableEdgeInsetDetails = edgeInsets;

      // THEN it should work without type errors
      expect(details.top).toBe(10);
      expect(details.left).toBe(20);
      expect(details.bottom).toBe(30);
      expect(details.right).toBe(40);
    });
  });

  describe('fromDict with edge cases', () => {
    it('should handle dictionary with NaN values', () => {
      // GIVEN a dictionary with NaN values
      const dict: IterableEdgeInsetDetails = {
        top: NaN,
        left: NaN,
        bottom: NaN,
        right: NaN
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have NaN values
      expect(edgeInsets.top).toBeNaN();
      expect(edgeInsets.left).toBeNaN();
      expect(edgeInsets.bottom).toBeNaN();
      expect(edgeInsets.right).toBeNaN();
    });

    it('should handle dictionary with Infinity values', () => {
      // GIVEN a dictionary with Infinity values
      const dict: IterableEdgeInsetDetails = {
        top: Infinity,
        left: -Infinity,
        bottom: Infinity,
        right: -Infinity
      };

      // WHEN creating from dictionary
      const edgeInsets = IterableEdgeInsets.fromDict(dict);

      // THEN it should have Infinity values
      expect(edgeInsets.top).toBe(Infinity);
      expect(edgeInsets.left).toBe(-Infinity);
      expect(edgeInsets.bottom).toBe(Infinity);
      expect(edgeInsets.right).toBe(-Infinity);
    });
  });
});
