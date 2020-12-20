import React from 'react';
import Box from '@/components/Box';

import {useTranslation} from 'react-i18next';

import Text from '@/components/Text';

import {Image} from 'react-native';
import movieEmoji from '@/assets/img/movie emoji.png';

const movieEmojiUri = Image.resolveAssetSource(movieEmoji).uri;

console.log(movieEmojiUri);
const DefaultWorld = () => {
    const {t} = useTranslation();

    return (
        <Box backgroundColor="dark" flex={1}>
            <Text variant="text" color="white" textAlign="center">
                {t('default_world.title', 'Sélectionner ce que vous préférez')}
            </Text>
            <Image source={{uri: movieEmojiUri}} />
        </Box>
    );
};

export default DefaultWorld;
