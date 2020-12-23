import React from 'react';

import {TouchableOpacity, View} from 'react-native';
import {useRestyle, spacing, border, backgroundColor} from '@shopify/restyle';
import Text from './Text';
import {createRestyleComponent, createVariant} from '@shopify/restyle';
import {height, width} from '@/theme';

export const Button = ({
    onPress,
    label,
    children,
    style,
    textProps = {},
    ...rest
}) => {
    const variant = createVariant({themeKey: 'buttonVariants'});
    const props = useRestyle(
        [variant, spacing, border, backgroundColor, height, width],
        rest,
    );
    return (
        <TouchableOpacity onPress={onPress}>
            <View {...props}>
                {!children && <Text {...textProps}>{label}</Text>}
                {children && children}
            </View>
        </TouchableOpacity>
    );
};

export const RoundedButton = ({onPress, label, children, radius, ...rest}) => {
    return (
        <Button
            style={{borderRadius: radius}}
            {...{onPress, label, children, ...rest}}>
            {children}
        </Button>
    );
};
