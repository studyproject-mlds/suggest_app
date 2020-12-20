import {boxRestyleFunctions} from '@shopify/restyle';
import {createRestyleComponent} from '@shopify/restyle';
import {View} from 'react-native';
import {height, width} from '@/theme';

const Box = createRestyleComponent(
	[...boxRestyleFunctions, height, width],
	View,
);

export default Box;
