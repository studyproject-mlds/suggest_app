import FastImage from 'react-native-fast-image';
import {Image} from 'react-native';
import movieEmoji from '@/assets/img/FILM_EMOJI.png';
import seriesEmoji from '@/assets/img/SERIES_EMOJI.png';
import swipeIcon from '@/assets/img/SWIPE_ICONE.png';

import listIcon from '@/assets/img/LISTE_ICONE.png';
import searchIcon from '@/assets/img/RECHERCHER_ICONE.png';

export const images = {
    movieEmoji,
    seriesEmoji,
    swipeIcon,
    listIcon,
    searchIcon,
};

// Convert image refs into image objects with Image.resolveAssetSource
export function preloadImages(images = images) {
    const uris = Object.values(images).map((image) => ({
        uri: Image.resolveAssetSource(image).uri,
    }));

    FastImage.preload(uris);
}
const loadImagesOld = async (images) => {
    const rep = await Promise.all(
        Object.keys(images).map((i) => {
            let img = {
                ...Image.resolveAssetSource(images[i]),
                cache: 'force-cache',
            };

            return Image.prefetch(img);
        }),
    );
    return rep;
};

export default async () => preloadImages(images);
