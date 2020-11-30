import 'react-native-gesture-handler';
import * as React from 'react';
import Navigation from '@/navigation/navigation';
import theme from './theme';
import {SafeAreaView, StatusBar} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Navigation />
		</ThemeProvider>
	);
}
