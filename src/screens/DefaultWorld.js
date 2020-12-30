import React from 'react';
import Box from '@/components/Box';

import {useTranslation} from 'react-i18next';

import Text from '@/components/Text';
import {Button} from '@/components/Button';

import FastImage from 'react-native-fast-image';

import {images} from '@/plugins/images';

import {theme} from '@/theme';

import {useApp} from '@/hooks';

import {actions as worldActions} from '@/state/world';

import {actions as meActions, selectors as meSelectors} from '@/state/me';

const ButtonWorld = ({source, label = '', ...props}) => (
    <Button variant="world" {...props}>
        <FastImage
            source={source}
            style={{width: theme.height.xl, height: theme.height.xl}}
        />
        <Text
            mt={'s'}
            textAlign="center"
            color="white"
            textTransform="uppercase">
            {label}
        </Text>
    </Button>
);
const DefaultWorld = () => {
    const {t} = useTranslation();

    const {
        api: {execute, dispatch},
    } = useApp();

    const error = meSelectors.getError();

    const onPress = (world) => async () => {
        await execute(worldActions.setDefaultWorldInProgress, {world});
        // TODO: Change in futur - add world initialization
        await dispatch(meActions.setDefaultWorld, {world});
    };

    return (
        <Box
            backgroundColor="dark"
            flex={1}
            justifyContent="space-between"
            py={'xxxl'}>
            <Text variant="text" color="white" textAlign="center">
                {t('default_world.title', 'Veuillez séléctionner un thème')}
            </Text>

            <Box flexDirection="row" justifyContent="space-around">
                <ButtonWorld
                    source={images.movieEmoji}
                    label="Film"
                    onPress={onPress('movie')}
                />
                <ButtonWorld
                    source={images.seriesEmoji}
                    label="Series"
                    onPress={onPress('series')}
                />
            </Box>
            <Box alignItems="center">
                <Text color="red">{error}</Text>
            </Box>
            <Box mx="l" mb={'s'}>
                {/* <Button
                    variant="main"
                    label="Continuer"
                    textProps={{variant: 'main'}}
                />*/}
            </Box>
        </Box>
    );
};

export default DefaultWorld;
