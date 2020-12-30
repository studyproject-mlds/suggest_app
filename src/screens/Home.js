import * as React from 'react';
import Box from '@/components/Box';
import Text from '@/components/Text';
import {RoundedButton, Button} from '@/components/Button';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentDurationFormatSetup from 'moment-duration-format';

import Play from '@/assets/img/play-button.svg';
import Etoile from '@/assets/img/etoile.svg';
import {useApp} from '@/hooks';
import {selectors as meSelectors, actions as meActions} from '@/state/me';
import {
    actions as genresActions,
    selectors as genreSelectors,
} from '@/state/genres';

import Swiper from 'react-native-deck-swiper';

import {theme} from '@/theme';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WebView} from 'react-native-webview';

import {Dimensions, StyleSheet} from 'react-native';

import {images} from '@/plugins/images';

import {useDeepCompareEffect} from '@/hooks';

const Content = ({card, setVideoId}) => {
    const genresAll = genreSelectors.getGenres();
    const genres = card?.genres?.map((genre) => genresAll[genre]?.name);
    const durationAsMoment = moment.duration(card?.duration ?? 0, 'minutes');

    const [hours, minutes] = [
        durationAsMoment.hours(),
        durationAsMoment.minutes(),
    ];
    const duration = durationAsMoment.format('H [h] mm');

    const onPress = () => {
        card?.trailer && setVideoId(card?.trailer);
    };

    return (
        <Box style={styles.card}>
            <FastImage
                source={{uri: card?.image}}
                style={[StyleSheet.absoluteFill]}
            />
            <Box flex={1} justifyContent="center" alignItems="center" mt="l">
                {card?.trailer ? (
                    <RoundedButton
                        onPress={onPress}
                        backgroundColor="mainGray"
                        radius={theme.height.xxl / 2}>
                        <Play
                            width={theme.height.xxl}
                            height={theme.height.xxl}
                            fill={theme.colors.white}
                        />
                    </RoundedButton>
                ) : null}
            </Box>
            <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="flex-end">
                <Box
                    backgroundColor="description"
                    flexDirection="row"
                    px="xs"
                    alignItems="center">
                    <Etoile width={theme.height.s} height={theme.height.s} />
                    <Text color="white" textAlign="center" fSize="medium">
                        {' '}
                        {card?.note_tmdb}/10
                    </Text>
                </Box>
            </Box>
            <Box
                backgroundColor="description"
                style={{marginTop: 'auto'}}
                h="xxxl"
                py="s">
                <Text
                    color="white"
                    textAlign="center"
                    fSize="large"
                    numberOfLines={1}
                    textTransform="uppercase">
                    {card?.title}
                </Text>
                <Text
                    color="subtitle"
                    textAlign="center"
                    fSize="medium"
                    numberOfLines={1}>
                    {card?.date?.split('-')?.[0]}
                </Text>
                <Text
                    color="subtitle"
                    textAlign="center"
                    fSize="medium"
                    numberOfLines={1}>
                    {duration}
                </Text>
                <Text
                    color="subtitle"
                    textAlign="center"
                    fSize="medium"
                    numberOfLines={1}>
                    {genres?.slice(0, 4).join(' / ')}
                </Text>
                <Text
                    color="subtitle"
                    textAlign="center"
                    fSize="medium"
                    numberOfLines={1}>
                    Real: {card?.reals?.map((real) => real.name)?.join(' / ')}
                    {'  '}
                    Acteurs:{' '}
                    {card?.actors
                        ?.slice(0, 2)
                        ?.map((real) => real.name)
                        ?.join(' / ')}
                </Text>
            </Box>
        </Box>
    );
};

const ButtonClick = ({radius = 50, children, ...props}) => {
    return (
        <Button variant="buttonClick" {...props}>
            {children}
        </Button>
    );
};

const {width, height} = Dimensions.get('window');
const textFSWait = 'Chargement de la video en cours...';
export default function Home() {
    const {
        api: {dispatch},
    } = useApp();
    const defaultWorld = meSelectors.getDefaultWorld();
    const insets = useSafeAreaInsets();

    const [videoId, setVideoId] = React.useState(null);
    const [textFs, setTextFs] = React.useState(textFSWait);

    const genres = genreSelectors.getGenres();
    const suggestions = meSelectors.getSuggestions({world: defaultWorld}) ?? [];
    const [suggestionsFiltered, setSuggestionsFiltered] = React.useState([]);

    const swiper = React.useRef();

    React.useEffect(() => {
        if (Object.keys(genres ?? {}).length === 0)
            dispatch(genresActions.getGenres);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genres]);

    React.useEffect(() => {
        (async () => {
            if (defaultWorld) {
                await dispatch(meActions.getSuggestions, {world: defaultWorld});
            }
        })();
    }, [dispatch, defaultWorld]);

    useDeepCompareEffect(() => {
        if (suggestions) {
            FastImage.preload(
                suggestions.map((suggestion) => ({uri: suggestion.image})),
            );
            setSuggestionsFiltered(
                suggestions?.filter(
                    (suggestion) => (suggestion?.reals ?? []).length > 0,
                ),
            );
        }
    }, [suggestions]);
    const onMessage = (event) => {
        const message = event.nativeEvent.data;
        console.log(message);
        if (message === 'End Full Screen') {
            setTextFs(textFSWait);
            setVideoId(null);
        } else if (message === 'Full Screen') {
            setTextFs('');
        }
    };

    // https://gist.github.com/jamonholmgren/f300be30399829f38d96ad5d05e5aaa6
    const injectedJS = `
          (function() {
            setTimeout(() => {
              const video = document.getElementsByClassName("html5-main-video")[0]
              video.addEventListener('webkitbeginfullscreen', (event) => {
                window.ReactNativeWebView.postMessage("Full Screen");
              })
              video.addEventListener('webkitendfullscreen', (event) => {
                window.ReactNativeWebView.postMessage("End Full Screen");
              })
            }, 1000)
          })();
          true; 
        `;

    const onSwipedLeft = (cardIndex) => {
        const sugg = suggestionsFiltered?.[cardIndex];
        if (sugg) {
            dispatch(meActions.setSuggestion, {
                world: defaultWorld,
                id: sugg.id,
                action: 'IGNORED',
            });
        }
    };
    const onSwipedRight = (cardIndex) => {
        const sugg = suggestionsFiltered?.[cardIndex];
        if (sugg) {
            dispatch(meActions.setSuggestion, {
                world: defaultWorld,
                id: sugg.id,
                action: 'ADDED',
            });
        }
    };
    const onSwipedTop = (cardIndex) => {
        const sugg = suggestionsFiltered?.[cardIndex];
        if (sugg) {
            dispatch(meActions.setSuggestion, {
                world: defaultWorld,
                id: sugg.id,
                action: 'RATED',
                rate: 5,
            });
        }
    };

    return (
        <Box flex={1} backgroundColor="dark">
            <Box flex={1} backgroundColor="dark" justifyContent="space-around">
                {videoId && (
                    <Box
                        height={height}
                        width="100%"
                        backgroundColor="dark"
                        zIndex={5000000000}>
                        <Box top={height / 2}>
                            <Text
                                color="white"
                                textAlign="center"
                                fSize="large">
                                {textFs}
                            </Text>
                        </Box>
                        <WebView
                            style={{backgroundColor: 'dark'}}
                            containerStyle={{
                                backgroundColor: 'dark',
                                opacity: 0,
                            }}
                            injectedJavaScript={injectedJS}
                            onMessage={onMessage}
                            allowsFullscreenVideo={true}
                            javaScriptEnabled={true}
                            scrollEnabled={false}
                            userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 
 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                            source={{
                                uri: `https://www.youtube.com/embed/${videoId}?autoplay=1&fullscreen=1`,
                            }}
                        />
                    </Box>
                )}
                <Box flex={1} backgroundColor="dark">
                    <Text color="white">
                        {suggestions?.length} - {suggestionsFiltered?.length}
                    </Text>
                    <Swiper
                        ref={swiper}
                        cards={suggestionsFiltered ?? []}
                        renderCard={(card) =>
                            card && (
                                <Content
                                    card={card}
                                    setVideoId={(...args) => {
                                        setTimeout(() => setTextFs(''), 3000);
                                        setVideoId(...args);
                                    }}
                                />
                            )
                        }
                        onSwiped={(cardIndex) => {
                            console.log(cardIndex);
                        }}
                        onSwipedAll={() => {
                            console.log('onSwipedAll', swiper.cardIndex);
                        }}
                        onSwipedLeft={onSwipedLeft}
                        onSwipedRight={onSwipedRight}
                        onSwipedTop={onSwipedTop}
                        cardIndex={0}
                        backgroundColor={'dark'}
                        stackSize={2}
                        stackScale={25}
                        stackSeparation={15}
                        marginBottom={
                            theme.height.xl + insets.bottom + theme.spacing.xxxl
                        }
                        containerStyle={{marginBottom: 0}}
                        marginTop={-insets.top}
                        horizontalThreshold={width / 3}
                        disableBottomSwipe={true}
                        cardVerticalMargin={55}
                    />
                </Box>
                <Box
                    backgroundColor="dark"
                    flexDirection="row"
                    m="s"
                    alignItems="center"
                    justifyContent="space-around">
                    <Box backgroundColor="dark">
                        <ButtonClick
                            onPress={() => swiper.current?.swipeLeft()}>
                            <FastImage
                                source={images.ignorer}
                                style={theme.imageVariants.buttonClick}
                            />
                        </ButtonClick>
                        <Text
                            color="white"
                            textAlign="center"
                            textTransform="uppercase">
                            Ignorer
                        </Text>
                    </Box>
                    <Box backgroundColor="dark">
                        <ButtonClick onPress={() => swiper.current?.swipeTop()}>
                            <FastImage
                                source={images.noter}
                                style={theme.imageVariants.buttonClick}
                            />
                        </ButtonClick>
                        <Text
                            color="white"
                            textAlign="center"
                            textTransform="uppercase">
                            Déja vu
                        </Text>
                    </Box>
                    <Box backgroundColor="dark">
                        <ButtonClick
                            onPress={() => swiper.current?.swipeRight()}>
                            <FastImage
                                source={images.ajouter}
                                style={theme.imageVariants.buttonClick}
                            />
                        </ButtonClick>
                        <Text
                            color="white"
                            textAlign="center"
                            textTransform="uppercase">
                            Ajouter
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: 'dark',
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.mainGray,
        justifyContent: 'center',
        backgroundColor: 'dark',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'dark',
    },
};
