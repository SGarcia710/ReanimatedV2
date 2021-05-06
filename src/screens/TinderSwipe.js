import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

const {width, height} = Dimensions.get('window');
export const PROFILES = [
  {
    id: '1',
    name: 'Ego',
    age: 24,
    image: require('../assets/images/Card1.png'),
  },
  {
    id: '2',
    name: 'Conflict',
    age: 30,
    image: require('../assets/images/Card2.png'),
  },
  {
    id: '3',
    name: 'Critique',
    age: 21,
    image: require('../assets/images/Card3.png'),
  },
  {
    id: '4',
    name: 'Deadlines',
    age: 28,
    image: require('../assets/images/Card4.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'space-evenly',
  },
  cards: {
    flex: 1,
    margin: 16,
    zIndex: 100,
  },
});

const TinderSwipe = () => {
  const scale = useSharedValue(1);

  const [profiles, setProfiles] = useState(PROFILES);
  const onSwipe = useCallback(() => {
    setProfiles(profiles.slice(0, profiles.length - 1));
  }, [profiles]);
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        {React.Children.toArray(
          profiles.map((profile, index) => {
            const onTop = index === profiles.length - 1;
            return (
              <Swipeable
                scale={scale}
                profile={profile}
                onSwipe={onSwipe}
                onTop={onTop}
              />
            );
          }),
        )}
      </View>
    </View>
  );
};

// Snap points
const alpha = Math.PI / 12; // Maximum rotation angle
const A = Math.sin(alpha) * height + Math.cos(alpha) * width;

const snapPoints = [-A, 0, A];

const Swipeable = ({profile, onSwipe, onTop, scale}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive: ({translationX, translationY}, context) => {
      translateX.value = translationX + context.x;
      translateY.value = translationY + context.y;

      scale.value = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [1, 0.95, 1],
        Extrapolate.CLAMP, // No queremos ir fuera de estos rangos por eso extrapolamos con CLAMP
      );
    },
    onEnd: ({velocityX, velocityY}, context) => {
      // Calcula la posición de X dependiendo de la velocidadX en 200ms y nos da los valores mas cercanos a los snapPoints
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateY.value = withSpring(0, {velocity: velocityY});
      translateX.value = withSpring(
        dest,
        {
          velocity: velocityX,
          restSpeedThreshold: dest === 0 ? 0.01 : 100,
          restDisplacementThreshold: dest === 0 ? 0.01 : 100,
        },
        () => {
          if (dest !== 0) {
            // Usamos esta función porque actualmente estamos en el UIThread y queremos ejecutar algo de JavaScript
            runOnJS(onSwipe)(dest); // podemos pasar el destination aquí a la función para saber si mandamos a la izq. o a la der. y hacer lo que queramos hacer
            // algo que pasará es que le tomará mucho tiempo para terminar a la animación, así que el SideEffect que queremos invocar se va a demorar, lo que causará que no podamos hacer de seguido otro swipe
          }
        },
      );
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <ProfileCard
          translateX={translateX}
          translateY={translateY}
          profile={profile}
          onTop={onTop}
          scale={scale}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const ProfileCard = ({profile, onTop, translateX, translateY, scale}) => {
  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {
          rotate: interpolate(
            translateX.value,
            [-width / 2, 0, width / 2], // Queremos que la rotación inicie cuando estemos desplazados la mitad de la pantalla a cada lado
            [alpha, 0, -alpha], // Queremos que rote el valor definido en alpha
            Extrapolate.CLAMP, // Hacemos una extrapolación de tipo CLAMP porque no queremos pasarnos de esta rotación
          ),
        },
        {scale: scale.value},
      ],
    };
  });
  const likeAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, width / 4], // Lo dividimos por 4 para que aparezca más rápido
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });
  const nopeAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [-width / 4, 0],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFill, containerAnimatedStyles]}>
      <Image style={profileCardStyles.image} source={profile.image} />
      <View style={profileCardStyles.overlay}>
        <View style={profileCardStyles.header}>
          <Animated.View style={[profileCardStyles.like, likeAnimatedStyles]}>
            <Text style={profileCardStyles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[profileCardStyles.nope, nopeAnimatedStyles]}>
            <Text style={profileCardStyles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={profileCardStyles.footer}>
          <Text style={profileCardStyles.name}>{profile.name}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const profileCardStyles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
  },
  name: {
    color: 'white',
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#6ee3b4',
  },
  likeLabel: {
    fontSize: 32,
    color: '#6ee3b4',
    fontWeight: 'bold',
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#ec5288',
  },
  nopeLabel: {
    fontSize: 32,
    color: '#ec5288',
    fontWeight: 'bold',
  },
});

export default TinderSwipe;
