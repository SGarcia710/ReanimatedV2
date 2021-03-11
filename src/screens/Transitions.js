import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const CARDS = [
  require('../assets/images/Card1.png'),
  require('../assets/images/Card2.png'),
  require('../assets/images/Card3.png'),
];

const Transitions = () => {
  const [toggled, setToggled] = useState(false);
  const isToggled = useSharedValue(false);

  useEffect(() => {
    isToggled.value = toggled;
  }, [toggled, isToggled]);

  const transition = useDerivedValue(() => {
    return withTiming(isToggled.value);
  });

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {React.Children.toArray(
        CARDS.map((card, index) => (
          <Card image={card} transition={transition} index={index} />
        )),
      )}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          backgroundColor: '#706fd3',
          paddingVertical: 14,
          paddingHorizontal: 28,
          borderRadius: 4,
        }}
        onPress={() => setToggled(!toggled)}>
        <Text
          style={{
            color: 'white',
          }}>
          Toggle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const origin = -(width / 3 - 8 * 2);

const Card = ({image, transition, index}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6],
    );
    return {
      transform: [{translateY: -origin}, {rotate}, {translateY: origin}],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        },
        animatedStyles,
      ]}>
      <Image
        style={{
          height: 300,
          aspectRatio: 1256 / 1838,
        }}
        source={image}
      />
    </Animated.View>
  );
};

export default Transitions;
