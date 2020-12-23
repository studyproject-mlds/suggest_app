import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Home from '@/screens/Home';

import DefaultWorld from '@/screens/DefaultWorld';

import Login from '@/screens/Login';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {EventRegister} from 'react-native-event-listeners';
import {Image} from 'react-native';

import {useApp} from '@/hooks';

import {actions as meActions, selectors as MeSelectors} from '@/state/me';

import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

import Box from '@/components/Box';

import {images} from '@/plugins/images';

import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
// import Text from '@/components/Text';

const DefaultView = ({}) => <Box flex={1} backgroundColor="black" />;

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = ({world, ...props}) => (
    <Tab.Navigator
        tabBarOptions={{
            // activeTintColor: '#e91e63',
            showLabel: false,
            style: {
                borderTopColor: '#292520',
                height: 50,
                backgroundColor: '#292520',
            },
            tabStyle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
            },
        }}>
        <Tab.Screen
            name="Home"
            options={{
                tabBarIcon: ({color, size}) => {
                    return (
                        <FastImage
                            source={images.swipeIcon}
                            style={{width: 35, height: 35}}
                            resizeMode={'contain'}
                        />
                    );
                },
            }}>
            {(navProps) => <Home {...props} {...navProps} />}
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
                            style={{width: 35, height: 35}}
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
                            style={{width: 35, height: 35}}
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
                        style={{width: 35, height: 35}}
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
);

const AuthenticatedStack = ({}) => {
    const {
        api: {dispatch},
        // redux: {useSelector},
    } = useApp();
    const {navigate} = useNavigation();

    const me = MeSelectors.getMe();
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
        console.log('dddd', isStatusFinish, defaultWorld);

        if (a !== 'default') {
            console.log('ddzd', a);
            navigate(a);
        }
    }, [me, defaultWorld]);
    // console.log(
    //     isStatusFinish ? (defaultWorld && 'Home') ?? 'DefaultWorld' : 'default',
    // );
    return (
        <Stack.Navigator
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
    console.log(isLoading, isAuthenticated);
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <StatusBar barStyle="dark-content" backgroundColor="dark" />
            <NavigationContainer>
                <Stack.Navigator
                    mode="modal"
                    screenOptions={{
                        headerShown: false,
                    }}>
                    {!isLoading && isAuthenticated && (
                        <Stack.Screen
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
                        <Stack.Screen name="default" component={DefaultView} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = {
    SafeAreaView: {flex: 1, backgroundColor: 'black'},
};
