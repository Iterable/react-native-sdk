export const baseColors = {
  purple10: '#FDF5FF',
  purple20: '#EBD3F1',
  purple50: '#B56DC6',
  purple60: '#A65FB4',
  purple70: '#9751A2',
  purple90: '#79347F',
  purple100: '#6A266D',
  green10: '#E6FFF7',
  green20: '#CAF3E7',
  green50: '#59C1A7',
  green90: '#1DA180',
  green100: '#0E9976',
  cognac80: '#CC7614',
  cyan10: '#E6FBFF',
  cyan20: '#C2F0FC',
  cyan50: '#34C3F2',
  cyan80: '#2AA0C6',
  cyan100: '#2489A9',
  red10: '#FEE5E9',
  red20: '#FBC3CB',
  red50: '#EF3D55',
  red60: '#E53B52',
  red100: '#BF3144',
  mustard10: '#FFF8D9',
  mustard20: '#FAECAD',
  mustard50: '#F2CA1B',
  mustard100: '#997D00',
  salmon10: '#FFF5F5',
  salmon20: '#FFDAD3',
  salmon50: '#FF6F49',
  salmon80: '#F06845',
  salmon100: '#E66442',
  black: '#000000',
  white: '#FFFFFF',
  grey1: '#FAFAFA',
  grey5: '#F5F4F4',
  grey10: '#EEECED',
  grey15: '#E0DEDF',
  grey25: '#CCC8CA',
  grey35: '#B8B1B4',
  grey50: '#999094',
  grey60: '#7A7376',
  grey80: '#3D3A3B',
  grey90: '#1F1D1E',
  midnight80: '#0D3D63',
  midnight100: '#0B3251',
  ocean80: '#11747E',
  ocean100: '#0B4D54',
  forest90: '#126354',
  forest100: '#10594B',
  seabreeze100: '#1BC9C9',
  lime100: '#C8ED77',
  lemon100: '#F4EF4D',
  tangerine100: '#F79219',
  cottoncandy100: '#FCACD1',
  flamingo100: '#FF4D80',
  lavenderLighten40: '#DFCFEB',
  lavenderLighten100: '#F8F5FB',
  violet80: '#5156BA',
  success100: '#0B7A5E',
  warning100: '#BD5B00',
  overlay: 'rgba(24, 4, 28, 0.33)',
  secondaryText: '#787174',
};
export type BaseColors = typeof baseColors;

export const primaryColors = {
  purple100: baseColors.purple100,
  purple90: baseColors.purple90,
  purple70: baseColors.purple70,
  purple50: baseColors.purple50,
  purple20: baseColors.purple20,
  purple10: baseColors.purple10,
  green100: baseColors.green100,
  green50: baseColors.green50,
  green20: baseColors.green20,
  green10: baseColors.green10,
  cyan100: baseColors.cyan100,
  cyan50: baseColors.cyan50,
  cyan20: baseColors.cyan20,
  cyan10: baseColors.cyan10,
  red100: baseColors.red100,
  red50: baseColors.red50,
  red10: baseColors.red10,
};
export type PrimaryColors = typeof primaryColors;

export const secondaryColors = {
  mustard100: baseColors.mustard100,
  mustard50: baseColors.mustard50,
  mustard20: baseColors.mustard20,
  mustard10: baseColors.mustard10,
  salmon100: baseColors.salmon100,
  salmon50: baseColors.salmon50,
  salmon20: baseColors.salmon20,
  salmon10: baseColors.salmon10,
};
export type SecondaryColors = typeof secondaryColors;

export const tertiaryColors = {
  midnight100: baseColors.midnight100,
  ocean100: baseColors.ocean100,
  forest100: baseColors.forest100,
  seabreeze100: baseColors.seabreeze100,
  lime100: baseColors.lime100,
  lemon100: baseColors.lemon100,
  tangerine100: baseColors.tangerine100,
  cottoncandy100: baseColors.cottoncandy100,
  flamingo100: baseColors.flamingo100,
};
export type TertiaryColors = typeof tertiaryColors;

// grey vs gray
export const neutrals = {
  grey90: baseColors.grey90,
  grey80: baseColors.grey80,
  grey60: baseColors.grey60,
  grey50: baseColors.grey50,
  grey35: baseColors.grey35,
  grey25: baseColors.grey25,
  grey15: baseColors.grey15,
  grey10: baseColors.grey10,
  grey5: baseColors.grey5,
  grey1: baseColors.grey1,
  white: baseColors.white,
};
export type Neutrals = typeof neutrals;

// Exact match to an Iterable color
// Custom group not tracked by lighthouse
export const brandColors = {
  brandPurple: baseColors.purple100,
  brandGreen: baseColors.green50,
  brandCyan: baseColors.cyan50,
  brandRed: baseColors.red50,
  brandMustard: baseColors.mustard50,
  brandSalmon: baseColors.salmon50,
  brandGrey: baseColors.grey50,
};
export type BrandColors = typeof brandColors;

export const utilityColors = {
  interactive100: baseColors.purple100,
  interactive50: baseColors.purple50,
  interactive10: baseColors.purple10,
  positive100: baseColors.green100,
  positive50: baseColors.green50,
  positive10: baseColors.green10,
  negative100: baseColors.red100,
  negative50: baseColors.red50,
  negative10: baseColors.red10,
  warning100: baseColors.warning100,
  warning50: baseColors.salmon50,
  warning10: baseColors.salmon10,
  info100: baseColors.cyan100,
  info50: baseColors.cyan50,
  info10: baseColors.cyan10,
};
export type UtilityColors = typeof utilityColors;

export const textColors = {
  textPrimary: baseColors.grey80,
  textSecondary: baseColors.secondaryText,
  textDisabled: baseColors.grey50,
  textOnColor: baseColors.white,
  textInteractive: baseColors.purple70,
  textInteractiveHover: baseColors.purple100,
  textDestructive: baseColors.red100,
  textSuccess: baseColors.green100,
  textWarning: baseColors.warning100,
  textInfo: baseColors.cyan100,
  textLink: baseColors.purple90,
};
export type TextColors = typeof textColors;

export const backgroundColors = {
  backgroundPrimary: baseColors.white,
  backgroundPrimaryHover: baseColors.grey5,
  backgroundSecondary: baseColors.grey1,
  backgroundSecondaryHover: baseColors.grey10,
  backgroundTertiary: baseColors.grey5,
  backgroundTertiaryHover: baseColors.grey15,
  backgroundEmphasis: baseColors.grey15,
  backgroundStrong: baseColors.grey35,
  backgroundStrongHover: baseColors.grey50,
  backgroundDisabled: baseColors.grey5,
  backgroundDisabledStrong: baseColors.grey35,
  backgroundInteractive: baseColors.purple10,
  backgroundInteractiveStrong: baseColors.purple100,
  backgroundDestructive: baseColors.red50,
  backgroundDestructiveSubtle: baseColors.red10,
  backgroundDestructiveStrong: baseColors.red100,
  backgroundSuccess: baseColors.green100,
  backgroundSuccessSubtle: baseColors.green10,
  backgroundWarning: baseColors.warning100,
  backgroundWarningSubtle: baseColors.salmon10,
  backgroundInfo: baseColors.cyan100,
  backgroundInfoSubtle: baseColors.cyan10,
  backgroundDark: baseColors.grey80,
  backgroundScreen: baseColors.overlay,
  backgroundSegmentedControl: baseColors.grey10,
  backgroundSegmentedControlHover: baseColors.grey25,
};
export type BackgroundColors = typeof backgroundColors;

export const linkColors = {
  link: textColors.textInteractive,
  linkHover: textColors.textInteractiveHover,
  linkActive: textColors.textPrimary,
  linkFocus: textColors.textInteractiveHover,
  linkFocusOutline: textColors.textInteractiveHover,
  linkDisabled: textColors.textDisabled,
};
export type LinkColors = typeof linkColors;

export const borderColors = {
  borderPrimary: baseColors.grey15,
  borderPrimarySubtle: baseColors.grey10,
  borderStrong: baseColors.grey25,
  borderEmphasis: baseColors.grey50,
  borderOnColor: baseColors.white,
  borderInteractive: baseColors.purple50,
  borderInteractiveSubtle: baseColors.purple20,
  borderInteractiveStrong: baseColors.purple100,
  borderDestructive: baseColors.red100,
  borderDestructiveSubtle: baseColors.red20,
  borderSuccess: baseColors.green100,
  borderSuccessSubtle: baseColors.green20,
  borderWarning: baseColors.warning100,
  borderWarningSubtle: baseColors.salmon20,
  borderInfo: baseColors.cyan100,
  borderInfoSubtle: baseColors.cyan20,
  outlineDark: 'rgba(0,0,0,.08)',
  outlineLight: 'rbga(255,255,255,0.08)',
};
export type BorderColors = typeof borderColors;

export const iconColors = {
  iconPrimary: baseColors.secondaryText,
  iconPrimaryHover: baseColors.grey80,
  iconSubtle: baseColors.grey50,
  iconDisabled: baseColors.grey50,
  iconEmphasis: baseColors.grey80,
  iconOnColor: baseColors.white,
  iconOnColorSubtle: baseColors.grey25,
  iconInteractive: baseColors.purple90,
  iconInteractiveSubtle: baseColors.purple50,
  iconInteractiveHover: baseColors.purple100,
  iconDestructive: baseColors.red100,
  iconSuccess: baseColors.green100,
  iconWarning: baseColors.warning100,
  iconInfo: baseColors.cyan100,
  iconFolder: baseColors.cyan50,
};
export type IconColors = typeof borderColors;

export const highchartColorPalette = [
  baseColors.purple100,
  baseColors.green90,
  baseColors.red60,
  baseColors.cyan80,
  baseColors.salmon80,
  baseColors.ocean80,
  baseColors.red100,
  baseColors.violet80,
  baseColors.flamingo100,
  baseColors.forest90,
  baseColors.cognac80,
  baseColors.midnight80,
  baseColors.purple60,
];
export type HighchartColorPalette = typeof highchartColorPalette;

export const standardChartColors = {
  first: baseColors.purple100,
  second: baseColors.green90,
  third: baseColors.red50,
  fourth: baseColors.cyan80,
  fifth: baseColors.salmon80,
  other: baseColors.grey50,
};

export type StandardChartColors = typeof standardChartColors;

export const comparisonChartColors = {
  first: baseColors.cyan80,
  second: baseColors.salmon80,
};

export type ComparisonChartColors = typeof comparisonChartColors;

export const relatedChartColors = {
  purplePalette: {
    first: baseColors.purple100,
    second: baseColors.purple50,
  },
  greenPalette: {
    first: baseColors.forest90,
    second: baseColors.green90,
  },
  bluePalette: {
    first: baseColors.midnight80,
    second: baseColors.cyan80,
  },
};

export type RelatedChartColors = typeof relatedChartColors;

export const colors = {
  ...baseColors,
  ...brandColors,
  ...utilityColors,
  ...textColors,
  ...backgroundColors,
  ...linkColors,
  ...borderColors,
  ...iconColors,
  ...highchartColorPalette,
};
