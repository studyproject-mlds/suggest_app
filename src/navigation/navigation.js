import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Home from '@/screens/Home';
import Text from '@/components/Text';

import DefaultWorld from '@/screens/DefaultWorld';

import Login from '@/screens/Login';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {EventRegister} from 'react-native-event-listeners';
import {StyleSheet} from 'react-native';

import {theme} from '@/theme';

import {useApp} from '@/hooks';

import {actions as meActions, selectors as MeSelectors} from '@/state/me';

import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StatusBar} from 'react-native';

import Box from '@/components/Box';

import {images} from '@/plugins/images';

import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
// import Text from '@/components/Text';

export const styleFull = {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    height: '100%',
    width: '100%',
};

const DefaultView = ({}) => (
    <Box
        {...styleFull}
        backgroundColor="black"
        justifyContent="center"
        zIndex={10000000000000}
        alignItems="center">
        <Text color="white">Suggest</Text>
    </Box>
);

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = ({world, ...props}) => {
    const [show, setShow] = React.useState(false);
    const [count, setCount] = React.useState(0);

    const onLayout = () => {
        setCount((i) => i + 1);
        if (count === 2) {
            setShow(true);
        }
    };

    return (
        <React.Fragment>
            {!show && <DefaultView />}
            <Box style={{...styleFull}}>
                <SafeAreaView
                    style={[styles.SafeAreaViewUp]}
                    onLayout={onLayout}
                />
                <SafeAreaView
                    style={[styles.SafeAreaViewDown]}
                    onLayout={onLayout}>
                    {show && (
                        <Tab.Navigator
                            tabBarOptions={{
                                // activeTintColor: '#e91e63',
                                showLabel: false,
                                style: {
                                    borderTopColor: theme.colors.mainGray,
                                    height: theme.height.xl,
                                    backgroundColor: theme.colors.mainGray,
                                },
                                tabStyle: {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: theme.height.xl,
                                },
                            }}>
                            <Tab.Screen
                                name="Home"
                                options={{
                                    tabBarIcon: ({color, size}) => {
                                        return (
                                            <FastImage
                                                source={images.swipeIcon}
                                                style={styles.tab}
                                            />
                                        );
                                    },
                                }}>
                                {(navProps) => (
                                    <Home {...props} {...navProps} />
                                )}
                            </Tab.Screen>
                            {/*listIcon*/}
                            <Tab.Screen
                                name="Search"
                                component={Home}
                                options={{
                                    tabBarIcon: ({color, size}) => {
                                        return (
                                            <FastImage
                                                source={images.searchIcon}
                                                style={styles.tab}
                                                resizeMode={'contain'}
                                            />
                                        );
                                    },
                                }}
                            />
                            <Tab.Screen
                                name="list"
                                component={Home}
                                options={{
                                    tabBarIcon: ({color, size}) => {
                                        return (
                                            <FastImage
                                                source={images.listIcon}
                                                style={styles.tab}
                                                resizeMode={'contain'}
                                            />
                                        );
                                    },
                                }}
                            />
                            <Tab.Screen
                                name="world"
                                component={DefaultView}
                                options={{
                                    tabBarIcon: ({tintColor}) => (
                                        <FastImage
                                            source={
                                                world === 'movie'
                                                    ? images.movieEmoji
                                                    : world === 'series'
                                                    ? images.seriesEmoji
                                                    : images.movieEmoji
                                            }
                                            style={styles.tab}
                                            resizeMode={'contain'}
                                        />
                                    ),
                                }}
                                listeners={({navigation, route}) => ({
                                    tabPress: (e) => {
                                        // Prevent default action
                                        e.preventDefault();

                                        // Do something with the `navigation` object
                                        navigation.navigate('DefaultWorld');
                                    },
                                })}
                            />
                        </Tab.Navigator>
                    )}
                </SafeAreaView>
            </Box>
        </React.Fragment>
    );
};

const AuthenticatedStack = ({}) => {
    const {
        api: {dispatch},
        // redux: {useSelector},
    } = useApp();
    const {navigate} = useNavigation();

    const defaultWorld = MeSelectors.getDefaultWorld();
    const isStatusFinish = MeSelectors.isStatusFinish();

    React.useEffect(() => {
        dispatch(meActions.getMe);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const a = isStatusFinish
            ? (defaultWorld && 'Home') ?? 'DefaultWorld'
            : 'default';

        if (a !== 'default') {
            navigate(a);
        }
    }, [defaultWorld, isStatusFinish, navigate]);

    return (
        <Stack.Navigator
            options={{animationEnabled: false}}
            initialRouteName={'default'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Home" options={{animationEnabled: false}}>
                {(navProps) => <HomeStack {...navProps} world={defaultWorld} />}
            </Stack.Screen>
            <Stack.Screen
                name="DefaultWorld"
                component={DefaultWorld}
                options={{
                    title: 'DefaultWorld',
                    headerShown: false,
                    animationEnabled: false,
                }}
            />

            <Stack.Screen name="default" component={DefaultView} />
        </Stack.Navigator>
    );
};

const LoginStack = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Login">
                {(props) => <Login {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default function Navigation() {
    const {
        auth: {isAuthenticated, isLoading},
    } = useApp();
    //  <SafeAreaView style={{flex: 0, backgroundColor: 'black'}} />
    return (
        <>
            <SafeAreaProvider>
                <StatusBar barStyle="light-content" />
                <NavigationContainer>
                    <Stack.Navigator
                        mode="modal"
                        screenOptions={{
                            headerShown: false,
                        }}>
                        {!isLoading && isAuthenticated && (
                            <Stack.Screen
                                options={{animationEnabled: false}}
                                name="AuthenticatedStack"
                                component={AuthenticatedStack}
                            />
                        )}
                        {!isLoading && !isAuthenticated && (
                            <Stack.Screen
                                name="LoginStack"
                                component={LoginStack}
                            />
                        )}
                        {isLoading && (
                            <Stack.Screen
                                name="default"
                                component={DefaultView}
                            />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </>
    );
}

const styles = {
    SafeAreaViewUp: {flex: 0, backgroundColor: 'black'},
    SafeAreaViewDown: {flex: 1, backgroundColor: theme.colors.mainGray},
    tab: {...theme.imageVariants.tab},
};
