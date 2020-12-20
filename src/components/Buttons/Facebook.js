import React from 'react';
import {Button} from '@/components/Button';
import Text from '@/components/Text';
import FBLogo from '@/assets/img/fb.svg';

export default ({onPress = () => {}, ...props}) => {
  return (
    <Button
      flexDirection="row"
      backgroundColor="fbBlue"
      borderRadius={10}
      alignItems="center"
      justifyContent="space-evenly"
      onPress={onPress}
      {...props}>
      <FBLogo fill="white" width={24} height={24} />
      <Text variant="Social" color="white">
        Connectez-vous avec Facebook
      </Text>
    </Button>
  );
};
