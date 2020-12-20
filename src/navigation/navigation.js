import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Home from '@/screens/Home';

import DefaultWorld from '@/screens/DefaultWorld';

import Login from '@/screens/Login';

import {createStackNavigator} from '@react-navigation/stack';

// import {EventRegister} from 'react-native-event-listeners';

import {useApp} from '@/hooks';

import {actions as meActions, selectors as MeSelectors} from '@/state/me';

import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

// const DefaultWorldStack = ({}) => {
//     return (
//         <Stack.Screen
//             name="DefaultWorld"
//             component={DefaultWorld}
//             options={{
//                 title: 'DefaultWorld',
//             }}
//         />
//     );
// };

const AuthenticatedStack = ({}) => {
    const {
        api: {dispatch},
        redux: {useSelector},
    } = useApp();

    const defaultWorld = useSelector(MeSelectors.getDefaultWorld);

    React.useEffect(() => {
        dispatch(meActions.getMe);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack.Navigator>
            {(defaultWorld && (
                <Stack.Screen name="Home" component={Home} />
            )) ?? (
                <Stack.Screen
                    name="DefaultWorld"
                    component={DefaultWorld}
                    options={{
                        title: 'DefaultWorld',
                        headerShown: false,
                    }}
                />
            )}
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
    // console.log(isAuthenticated, isLoading);
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <StatusBar barStyle="dark-content" backgroundColor="dark" />
            <NavigationContainer>
                {!isLoading && isAuthenticated && <AuthenticatedStack />}
                {!isLoading && !isAuthenticated && <LoginStack />}
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = {
    SafeAreaView: {flex: 1, backgroundColor: 'black'},
};
