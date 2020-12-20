// import 'react-native-gesture-handler';
import React from 'react';

import Navigation from '@/navigation/navigation';
import theme from './theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@shopify/restyle';

import {Provider, store, clearState} from '@/state/store';

// import {Provider} from 'react-redux';

import {AuthProvider} from '@/auth';

import config from './config';

import './plugins/i18n';

export default function App() {
    const callbackAfterLogout = () => {
        // store.dispatch(logout()); WHY ??
        store.dispatch(clearState);
    };
    return (
        <Provider>
            <AuthProvider
                callbackAfterLogout={callbackAfterLogout}
                clientId={config.clientId}
                clientSecret={config.clientSecret}
                baseUrlAuth={config.baseUrlAuth}
                textAlertBeforeExpiredLogout="blabla">
                <ThemeProvider theme={theme}>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
                </ThemeProvider>
            </AuthProvider>
        </Provider>
    );
}
