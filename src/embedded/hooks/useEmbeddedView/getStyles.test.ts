import { getStyles } from './getStyles';
import { IterableEmbeddedViewType } from '../../enums';
import {
  embeddedBackgroundColors,
  embeddedBorderColors,
  embeddedBorderRadius,
  embeddedBorderWidth,
  embeddedPrimaryBtnBackgroundColors,
  embeddedPrimaryBtnTextColors,
  embeddedSecondaryBtnBackgroundColors,
  embeddedSecondaryBtnTextColors,
  embeddedTitleTextColors,
  embeddedBodyTextColors,
} from './embeddedViewDefaults';

describe('getStyles', () => {
  describe('default styles by view type (no config)', () => {
    it('returns Notification defaults when viewType is Notification', () => {
      const result = getStyles(IterableEmbeddedViewType.Notification);

      expect(result.backgroundColor).toBe(embeddedBackgroundColors.notification);
      expect(result.borderColor).toBe(embeddedBorderColors.notification);
      expect(result.borderWidth).toBe(embeddedBorderWidth.notification);
      expect(result.borderCornerRadius).toBe(embeddedBorderRadius.notification);
      expect(result.primaryBtnBackgroundColor).toBe(embeddedPrimaryBtnBackgroundColors.notification);
      expect(result.primaryBtnTextColor).toBe(embeddedPrimaryBtnTextColors.notification);
      expect(result.secondaryBtnBackgroundColor).toBe(embeddedSecondaryBtnBackgroundColors.notification);
      expect(result.secondaryBtnTextColor).toBe(embeddedSecondaryBtnTextColors.notification);
      expect(result.titleTextColor).toBe(embeddedTitleTextColors.notification);
      expect(result.bodyTextColor).toBe(embeddedBodyTextColors.notification);
    });

    it('returns Card defaults when viewType is Card', () => {
      const result = getStyles(IterableEmbeddedViewType.Card);

      expect(result.backgroundColor).toBe(embeddedBackgroundColors.card);
      expect(result.borderColor).toBe(embeddedBorderColors.card);
      expect(result.borderWidth).toBe(embeddedBorderWidth.card);
      expect(result.borderCornerRadius).toBe(embeddedBorderRadius.card);
      expect(result.primaryBtnBackgroundColor).toBe(embeddedPrimaryBtnBackgroundColors.card);
      expect(result.primaryBtnTextColor).toBe(embeddedPrimaryBtnTextColors.card);
      expect(result.secondaryBtnBackgroundColor).toBe(embeddedSecondaryBtnBackgroundColors.card);
      expect(result.secondaryBtnTextColor).toBe(embeddedSecondaryBtnTextColors.card);
      expect(result.titleTextColor).toBe(embeddedTitleTextColors.card);
      expect(result.bodyTextColor).toBe(embeddedBodyTextColors.card);
    });

    it('returns Banner defaults when viewType is Banner', () => {
      const result = getStyles(IterableEmbeddedViewType.Banner);

      expect(result.backgroundColor).toBe(embeddedBackgroundColors.banner);
      expect(result.borderColor).toBe(embeddedBorderColors.banner);
      expect(result.borderWidth).toBe(embeddedBorderWidth.banner);
      expect(result.borderCornerRadius).toBe(embeddedBorderRadius.banner);
      expect(result.primaryBtnBackgroundColor).toBe(embeddedPrimaryBtnBackgroundColors.banner);
      expect(result.primaryBtnTextColor).toBe(embeddedPrimaryBtnTextColors.banner);
      expect(result.secondaryBtnBackgroundColor).toBe(embeddedSecondaryBtnBackgroundColors.banner);
      expect(result.secondaryBtnTextColor).toBe(embeddedSecondaryBtnTextColors.banner);
      expect(result.titleTextColor).toBe(embeddedTitleTextColors.banner);
      expect(result.bodyTextColor).toBe(embeddedBodyTextColors.banner);
    });

    it('returns Banner defaults for unknown viewType (default branch)', () => {
      const unknownViewType = 999 as IterableEmbeddedViewType;
      const result = getStyles(unknownViewType);

      expect(result.backgroundColor).toBe(embeddedBackgroundColors.banner);
      expect(result.primaryBtnBackgroundColor).toBe(embeddedPrimaryBtnBackgroundColors.banner);
    });
  });

  describe('with null or undefined config', () => {
    it('returns defaults when config is null', () => {
      const result = getStyles(IterableEmbeddedViewType.Notification, null);

      expect(result.backgroundColor).toBe(embeddedBackgroundColors.notification);
      expect(result.primaryBtnTextColor).toBe(embeddedPrimaryBtnTextColors.notification);
    });

    it('returns defaults when config is undefined', () => {
      const result = getStyles(IterableEmbeddedViewType.Card, undefined);

      expect(result.backgroundColor).toBe(embeddedBackgroundColors.card);
    });
  });

  describe('config overrides defaults', () => {
    it('uses config values when provided, overrides all style keys', () => {
      const config = {
        backgroundColor: '#000000',
        borderColor: '#111111',
        borderWidth: 2,
        borderCornerRadius: 10,
        primaryBtnBackgroundColor: '#222222',
        primaryBtnTextColor: '#333333',
        secondaryBtnBackgroundColor: '#444444',
        secondaryBtnTextColor: '#555555',
        titleTextColor: '#666666',
        bodyTextColor: '#777777',
      };

      const result = getStyles(IterableEmbeddedViewType.Notification, config);

      expect(result.backgroundColor).toBe('#000000');
      expect(result.borderColor).toBe('#111111');
      expect(result.borderWidth).toBe(2);
      expect(result.borderCornerRadius).toBe(10);
      expect(result.primaryBtnBackgroundColor).toBe('#222222');
      expect(result.primaryBtnTextColor).toBe('#333333');
      expect(result.secondaryBtnBackgroundColor).toBe('#444444');
      expect(result.secondaryBtnTextColor).toBe('#555555');
      expect(result.titleTextColor).toBe('#666666');
      expect(result.bodyTextColor).toBe('#777777');
    });

    it('overrides only provided config keys, rest use view-type defaults', () => {
      const config = {
        backgroundColor: '#abc',
        borderCornerRadius: 12,
      };

      const result = getStyles(IterableEmbeddedViewType.Card, config);

      expect(result.backgroundColor).toBe('#abc');
      expect(result.borderCornerRadius).toBe(12);
      expect(result.borderColor).toBe(embeddedBorderColors.card);
      expect(result.borderWidth).toBe(embeddedBorderWidth.card);
      expect(result.primaryBtnBackgroundColor).toBe(embeddedPrimaryBtnBackgroundColors.card);
      expect(result.primaryBtnTextColor).toBe(embeddedPrimaryBtnTextColors.card);
      expect(result.secondaryBtnBackgroundColor).toBe(embeddedSecondaryBtnBackgroundColors.card);
      expect(result.secondaryBtnTextColor).toBe(embeddedSecondaryBtnTextColors.card);
      expect(result.titleTextColor).toBe(embeddedTitleTextColors.card);
      expect(result.bodyTextColor).toBe(embeddedBodyTextColors.card);
    });
  });

  describe('return shape', () => {
    it('returns an object with all expected style keys', () => {
      const result = getStyles(IterableEmbeddedViewType.Banner);

      expect(result).toMatchObject({
        backgroundColor: expect.any(String),
        borderColor: expect.any(String),
        borderWidth: expect.any(Number),
        borderCornerRadius: expect.any(Number),
        primaryBtnBackgroundColor: expect.any(String),
        primaryBtnTextColor: expect.any(String),
        secondaryBtnBackgroundColor: expect.any(String),
        secondaryBtnTextColor: expect.any(String),
        titleTextColor: expect.any(String),
        bodyTextColor: expect.any(String),
      });
      expect(Object.keys(result)).toHaveLength(10);
    });
  });
});
