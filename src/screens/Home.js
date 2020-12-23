import * as React from 'react';
import Box from '@/components/Box';
import Text from '@/components/Text';
import {Button} from '@/components/Button';

import {useApp} from '@/hooks';

import {selectors as meSelectors} from '@/state/me';

export default function Home() {
    const {
        auth: {logout},
        // redux: {useSelector},
    } = useApp();
    const me = meSelectors.getMe();
    const defaultWorld = meSelectors.getDefaultWorld();

    return (
        <Box alignItems="center" justifyContent="center" flex={1}>
            <Text>Open up App.js to start working on your app!</Text>
            {me && me.first_name && (
                <Text>
                    HELLO {me.first_name} {defaultWorld}
                </Text>
            )}
            <Button
                onPress={() => {
                    logout();
                }}>
                <Text>Logout</Text>
            </Button>
        </Box>
    );
}
