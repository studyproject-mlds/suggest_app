import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import { useRestyle, spacing, border, backgroundColor } from '@shopify/restyle';
import Text from './Text';

const Button = ({ onPress, label, children, ...rest }: Props) => {
	const props = useRestyle([spacing, border, backgroundColor], rest);
	return (
		<TouchableOpacity onPress={onPress}>
			<View {...props}>
				{!children && <Text>{label}</Text>}
				{children && children}
			</View>
		</TouchableOpacity>
	);
};

export default Button;
