import React from 'react';

import {Button} from '@/components/Button';
import Text from '@/components/Text';
import GoogleLogo from '@/assets/img/google.svg';

export default ({onPress = () => {}, ...props}) => {
  return (
    <Button
      flexDirection="row"
      backgroundColor="white"
      borderRadius={10}
      alignItems="center"
      justifyContent="space-evenly"
      onPress={onPress}
      {...props}>
      <GoogleLogo width={24} height={24} />
      <Text variant="Social" color="googleGray">
        Connectez-vous avec Google
      </Text>
    </Button>
  );
};
