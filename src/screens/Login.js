import React from 'react';
import {backendFb, backendGoogle} from '@/auth/social';

import FbButton from '@/components/Buttons/Facebook';
import GoogleButton from '@/components/Buttons/Google';
import Box from '@/components/Box';
import Text from '@/components/Text';

import {useApp} from '@/hooks';

import {useTranslation} from 'react-i18next';

const Login = ({}) => {
    const {
        auth: {loginWithBackend},
    } = useApp();

    const {t} = useTranslation();

    const onClick = (backend) => async () => {
        await loginWithBackend({backend});
    };

    return (
        <Box backgroundColor="dark" flex={1}>
            <Box justifyContent="center" my="xxxl">
                <Text variant="text" color="white" textAlign="center">
                    {t('login.title')}
                </Text>
            </Box>
            <Box mx="l">
                <FbButton variant="Social" onPress={onClick(backendFb)} />
            </Box>
            <Box mx="l" my="m">
                <GoogleButton
                    variant="Social"
                    onPress={onClick(backendGoogle)}
                />
            </Box>
        </Box>
    );
};

Login.displayName = 'Login';

export default Login;
