import {createTheme} from '@shopify/restyle';
import {createRestyleFunction} from '@shopify/restyle';

export const height = createRestyleFunction({
  property: 'h',
  styleProperty: 'height',
  transform: ({value, theme, themeKey}) =>
    value
      ? Object.keys(theme[themeKey]).includes(value)
        ? theme[themeKey][value]
        : value
      : value,
  themeKey: 'height',
});
export const width = createRestyleFunction({
  property: 'w',
  styleProperty: 'width',
  transform: ({value, theme, themeKey}) =>
    value
      ? Object.keys(theme[themeKey]).includes(value)
        ? theme[themeKey][value]
        : value
      : value,
  themeKey: 'width',
});
const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  googleGray: '#928b8c',
  black: '#0B0B0B',
  dark: '#000000',
  white: '#FFFFFF',

  fbBlue: '#4267b2',
};

const theme = {
  colors: {
    ...palette,
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
  },
  height: {
    xxs: 5,
    xs: 10,
    s: 15,
    m: 30,
    l: 40,
    xl: 50,
    xxl: 100,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 80,
    xxxl: 100,
  },
  fontSizes: {
    small: 12,
    normal: 14,
    medium: 16,
    medim_large: 18,
    large: 20,
    extraLarge: 22,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  textVariants: {
    Social: {
      fontFamily: 'Archivo Narrow',
      fontSize: 24,
    },
    text: {
      fontFamily: 'Archivo Narrow',
      fontWeight: '600',
      fontSize: 28,
    },
    body: {
      fontFamily: 'ShopifySans',
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
};
theme.buttonVariants = {
  Social: {justifyContent: 'space-around', height: theme.height.xl},
};
export default createTheme(theme);
