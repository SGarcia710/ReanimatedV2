import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const Example1 = () => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    // withTiming will update this value from 0 to 1 in 1000ms
    // opacity.value = withTiming(1, {
    //   duration: 1000,
    // });
    // opacity.value = withRepeat(withDelay(1000, withSpring(1)), -1);
    opacity.value = withRepeat(
      withSequence(withSpring(1), withSpring(0.5)),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // opacity: opacity.value,
      transform: [
        {
          scale: interpolate(opacity.value, [0, 1], [0.5, 1]),
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f1e3',
      }}>
      <Animated.Image
        source={require('../assets/images/heart.png')}
        style={[
          {
            width: 150,
            height: 150,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default Example1;
