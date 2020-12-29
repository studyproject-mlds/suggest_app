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

export const fSize = createRestyleFunction({
    property: 'fSize',
    styleProperty: 'fontSize',
    transform: ({value, theme, themeKey}) =>
        value
            ? Object.keys(theme[themeKey]).includes(value)
                ? theme[themeKey][value]
                : value
            : value,
    themeKey: 'fontSizes',
});
const palette = {
    transparent: 'transparent',
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
    gray: '#2d2a25',

    fbBlue: '#4267b2',
    red: 'red',
};

const colorsExplore = {
    description: 'rgba(0, 0, 0, 0.89)',
    subtitle: '#868686',
};

const theme = {
    colors: {
        ...palette,
        ...colorsExplore,
        mainGray: '#292520',
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
        xxxl: 125,
        tab: 35,
        buttonClick: 40,
    },
    spacing: {
        xs: 5,
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
        xxl: 80,
        xxxl: 100,
        tab: 35,
    },
    fontSizes: {
        small: 12,
        normal: 14,
        medium: 16,
        medium_large: 18,
        large: 20,
        extraLarge: 22,
        exxtraLarge: 24,
        exxxtraLarge: 28,
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
        largeTablet: 1024,
    },
};

theme.textVariants = {
    defaults: {
        fontFamily: 'Archivo Narrow',
        fontSize: theme.fontSizes.normal,
    },
    Social: {
        fontFamily: 'Archivo Narrow',
        fontSize: theme.fontSizes.exxtraLarge,
    },
    text: {
        fontFamily: 'Archivo Narrow',
        fontWeight: '600',
        fontSize: theme.fontSizes.exxxtraLarge,
    },
    body: {
        fontFamily: 'Archivo Narrow',
        fontSize: theme.fontSizes.medium,
        lineHeight: theme.fontSizes.exxtraLarge,
        color: 'black',
    },
    main: {
        fontSize: theme.fontSizes.medium_large,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
};

theme.imageVariants = {
    tab: {
        width: theme.height.tab,
        height: theme.height.tab,
        resizeMode: 'contain',
    },
    buttonClick: {
        width: theme.height.buttonClick,
        height: theme.height.buttonClick,
        resizeMode: 'contain',
    },
};
theme.buttonVariants = {
    Social: {justifyContent: 'space-around', height: theme.height.xl},
    world: {
        width: theme.height.xxxl,
        height: theme.height.xxxl,
        borderRadius: theme.height.xxxl / 2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'gray',
        color: 'white',
    },
    main: {
        justifyContent: 'space-around',
        height: theme.height.l,
        borderRadius: theme.height.l / 4,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
    },
    buttonClick: {
        borderRadius: theme.height.buttonClick,
        padding: 'm',
        backgroundColor: 'mainGray',
    },
};
export {theme};
export default createTheme(theme);
