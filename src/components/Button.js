import React from 'react';

import {TouchableOpacity, View} from 'react-native';
import {useRestyle, spacing, border, backgroundColor} from '@shopify/restyle';
import Text from './Text';
import {createRestyleComponent, createVariant} from '@shopify/restyle';
import {height, width} from '@/theme';

export const Button = ({onPress, label, children, ...rest}: Props) => {
  const variant = createVariant({themeKey: 'buttonVariants'});
  const props = useRestyle(
    [variant, spacing, border, backgroundColor, height, width],
    rest,
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props}>
        {!children && <Text>{label}</Text>}
        {children && children}
      </View>
    </TouchableOpacity>
  );
};

import styled from 'styled-components/native';

const RoundedButtonStyled = styled(Button)`
  border-radius: ;
`;

export const RoundedButton = ({onPress, label, children, ...rest}: Props) => {
  return (
    <RoundedButtonStyled {...{onPress, label, children, ...rest}}>
      {children}
    </RoundedButtonStyled>
  );
};
